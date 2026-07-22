/**
 * PostgreSQL Database layer for Fraylon Payments.
 * Exposes the same repository API as the original JSON store.
 */

import pg from 'pg';
import crypto from 'crypto';
import { config } from '../config.js';
import { logger } from './logger.js';

const { Pool } = pg;

// Establish database pool
const pool = new Pool({
    connectionString: config.databaseUrl,
    ssl: config.databaseUrl.includes('localhost') || config.databaseUrl.includes('127.0.0.1')
        ? false
        : { rejectUnauthorized: false }
});

// Test connection and initialize tables
let initPromise = null;
export function initDb() {
    if (initPromise) return initPromise;

    initPromise = (async () => {
        logger.info('Connecting to PostgreSQL database...');
        const client = await pool.connect();
        try {
            logger.info('Initializing PostgreSQL database tables...');

            // Create users table
            await client.query(`
                CREATE TABLE IF NOT EXISTS users (
                    email VARCHAR(255) PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    password_hash VARCHAR(255) NOT NULL,
                    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
                );
            `);

            // Create orders table
            await client.query(`
                CREATE TABLE IF NOT EXISTS orders (
                    id VARCHAR(100) PRIMARY KEY,
                    receipt VARCHAR(100) NOT NULL,
                    plan_id VARCHAR(100) NOT NULL,
                    duration_months INTEGER NOT NULL,
                    amount_paise BIGINT NOT NULL,
                    currency VARCHAR(10) NOT NULL,
                    status VARCHAR(50) NOT NULL,
                    customer_email VARCHAR(255),
                    customer_name VARCHAR(255),
                    notes JSONB,
                    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
                );
            `);

            // Create payments table
            await client.query(`
                CREATE TABLE IF NOT EXISTS payments (
                    id VARCHAR(100) PRIMARY KEY,
                    order_id VARCHAR(100) NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
                    signature VARCHAR(255),
                    status VARCHAR(50) NOT NULL,
                    method VARCHAR(50),
                    amount_paise BIGINT NOT NULL,
                    currency VARCHAR(10) NOT NULL,
                    error_code VARCHAR(100),
                    error_description TEXT,
                    raw JSONB,
                    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
                );
            `);

            logger.info('PostgreSQL database tables initialized successfully.');
        } catch (err) {
            logger.error('Failed to initialize database tables:', err);
            throw err;
        } finally {
            client.release();
        }
    })();

    return initPromise;
}

async function ensureReady() {
    await initDb();
}

function dateToString(val) {
    if (val instanceof Date) {
        return val.toISOString().replace('T', ' ').slice(0, 19);
    }
    return val;
}

function hydrateOrder(row) {
    if (!row) return null;
    return {
        id: row.id,
        receipt: row.receipt,
        planId: row.plan_id,
        durationMonths: Number(row.duration_months),
        amountPaise: Number(row.amount_paise),
        currency: row.currency,
        status: row.status,
        customerEmail: row.customer_email,
        customerName: row.customer_name,
        notes: row.notes,
        createdAt: dateToString(row.created_at),
        updatedAt: dateToString(row.updated_at),
    };
}

function hydratePayment(row) {
    if (!row) return null;
    return {
        id: row.id,
        orderId: row.order_id,
        status: row.status,
        method: row.method,
        amountPaise: Number(row.amount_paise),
        currency: row.currency,
        errorCode: row.error_code,
        errorDescription: row.error_description,
        createdAt: dateToString(row.created_at),
    };
}

// ─────────────────── orderRepo ───────────────────
export const orderRepo = {
    async create(order) {
        await ensureReady();
        const query = `
            INSERT INTO orders (id, receipt, plan_id, duration_months, amount_paise, currency, status, customer_email, customer_name, notes)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            RETURNING *
        `;
        const values = [
            order.id,
            order.receipt,
            order.planId,
            order.durationMonths,
            order.amountPaise,
            order.currency,
            order.status || 'created',
            order.customerEmail || null,
            order.customerName || null,
            order.notes ? JSON.stringify(order.notes) : null
        ];
        const res = await pool.query(query, values);
        return hydrateOrder(res.rows[0]);
    },

    async findById(id) {
        await ensureReady();
        const res = await pool.query('SELECT * FROM orders WHERE id = $1', [id]);
        return res.rows.length ? hydrateOrder(res.rows[0]) : null;
    },

    async findByReceipt(receipt) {
        await ensureReady();
        const res = await pool.query('SELECT * FROM orders WHERE receipt = $1', [receipt]);
        return res.rows.length ? hydrateOrder(res.rows[0]) : null;
    },

    async findByEmail(email) {
        await ensureReady();
        const res = await pool.query('SELECT * FROM orders WHERE customer_email = $1 ORDER BY created_at DESC', [email]);
        return res.rows.map(hydrateOrder);
    },

    async setStatus(id, status) {
        await ensureReady();
        await pool.query(
            'UPDATE orders SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2',
            [status, id]
        );
    },
};

// ─────────────────── paymentRepo ───────────────────
export const paymentRepo = {
    async record(payment) {
        await ensureReady();
        const query = `
            INSERT INTO payments (id, order_id, signature, status, method, amount_paise, currency, error_code, error_description, raw)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            ON CONFLICT (id) DO UPDATE SET
                order_id = EXCLUDED.order_id,
                signature = EXCLUDED.signature,
                status = EXCLUDED.status,
                method = EXCLUDED.method,
                amount_paise = EXCLUDED.amount_paise,
                currency = EXCLUDED.currency,
                error_code = EXCLUDED.error_code,
                error_description = EXCLUDED.error_description,
                raw = EXCLUDED.raw
        `;
        const values = [
            payment.id,
            payment.orderId,
            payment.signature || null,
            payment.status,
            payment.method || null,
            payment.amountPaise,
            payment.currency,
            payment.errorCode || null,
            payment.errorDescription || null,
            payment.raw ? JSON.stringify(payment.raw) : null
        ];
        await pool.query(query, values);
    },

    async listForOrder(orderId) {
        await ensureReady();
        const res = await pool.query(
            'SELECT * FROM payments WHERE order_id = $1 ORDER BY created_at ASC',
            [orderId]
        );
        return res.rows.map(hydratePayment);
    },
};

// ─────────────────── userRepo ───────────────────
export const userRepo = {
    async create(email, name, password) {
        await ensureReady();
        const pwdHash = hashPassword(password);
        const query = `
            INSERT INTO users (email, name, password_hash)
            VALUES ($1, $2, $3)
            RETURNING email, name
        `;
        const res = await pool.query(query, [email.toLowerCase().trim(), name, pwdHash]);
        return res.rows[0];
    },

    async findByEmail(email) {
        await ensureReady();
        const res = await pool.query('SELECT * FROM users WHERE email = $1', [email.toLowerCase().trim()]);
        return res.rows.length ? res.rows[0] : null;
    }
};

// ─────────────────── Cryptographic Utilities ───────────────────
export function hashPassword(password) {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return `${salt}:${hash}`;
}

export function verifyPassword(password, storedHash) {
    if (!storedHash || !storedHash.includes(':')) return false;
    const parts = storedHash.split(':');
    const salt = parts[0];
    const originalHash = parts[1];
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return hash === originalHash;
}

const TOKEN_SECRET = process.env.JWT_SECRET || 'fraylon-super-secret-key-12345!';

export function generateToken(email) {
    const payload = {
        email,
        expires: Date.now() + 30 * 24 * 60 * 60 * 1000 // 30 days
    };
    const payloadStr = Buffer.from(JSON.stringify(payload)).toString('base64url');
    const signature = crypto.createHmac('sha256', TOKEN_SECRET).update(payloadStr).digest('base64url');
    return `${payloadStr}.${signature}`;
}

export function verifyToken(token) {
    if (!token) return null;
    const parts = token.split('.');
    if (parts.length !== 2) return null;
    
    const payloadStr = parts[0];
    const signature = parts[1];
    
    const expectedSignature = crypto.createHmac('sha256', TOKEN_SECRET).update(payloadStr).digest('base64url');
    if (signature !== expectedSignature) return null;
    
    try {
        const payload = JSON.parse(Buffer.from(payloadStr, 'base64url').toString('utf8'));
        if (payload.expires < Date.now()) return null; // Expired
        return payload;
    } catch (e) {
        return null;
    }
}

// Automatically trigger initialization when this module is imported.
// In a serverless context, functions are warm/cached, and this will execute once per container.
initDb().catch((err) => {
    logger.error('Startup database initialization failed:', err.message);
});
