import express from 'express';
import { orderRepo, userRepo, verifyToken, generateToken, verifyPassword } from '../lib/db.js';
import { logger } from '../lib/logger.js';

const router = express.Router();

// Middleware to require server-side token authentication
async function requireAuth(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized: Missing or invalid token.' });
    }
    
    const token = authHeader.substring(7);
    const decoded = verifyToken(token);
    if (!decoded) {
        return res.status(401).json({ error: 'Unauthorized: Token is expired or invalid.' });
    }
    
    const user = await userRepo.findByEmail(decoded.email);
    if (!user) {
        return res.status(401).json({ error: 'Unauthorized: User does not exist.' });
    }
    
    req.user = user;
    next();
}

// User signup endpoint
router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Name, email, and password are required.' });
    }
    
    const cleanEmail = email.toLowerCase().trim();
    if (!cleanEmail.includes('@')) {
        return res.status(400).json({ error: 'Please enter a valid email address.' });
    }
    
    try {
        const existingUser = await userRepo.findByEmail(cleanEmail);
        if (existingUser) {
            return res.status(409).json({ error: 'An account with this email address already exists.' });
        }
        
        const newUser = await userRepo.create(cleanEmail, name.trim(), password);
        const token = generateToken(newUser.email);
        res.status(201).json({
            user: { name: newUser.name, email: newUser.email },
            token
        });
    } catch (err) {
        logger.error('Signup error:', err);
        res.status(500).json({ error: 'Failed to create user account.' });
    }
});

// User login endpoint
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
    }
    
    const cleanEmail = email.toLowerCase().trim();
    try {
        const user = await userRepo.findByEmail(cleanEmail);
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password.' });
        }
        
        const match = verifyPassword(password, user.password_hash);
        if (!match) {
            return res.status(401).json({ error: 'Invalid email or password.' });
        }
        
        const token = generateToken(user.email);
        res.json({
            user: { name: user.name, email: user.email },
            token
        });
    } catch (err) {
        logger.error('Login error:', err);
        res.status(500).json({ error: 'Authentication failed.' });
    }
});

// Retrieve orders for the authenticated user
router.get('/orders', requireAuth, async (req, res) => {
    try {
        logger.info(`Fetching orders for authenticated user email: ${req.user.email}`);
        const orders = await orderRepo.findByEmail(req.user.email);
        res.json({ orders });
    } catch (err) {
        logger.error(`Error fetching orders for ${req.user.email}:`, err);
        res.status(500).json({ error: 'Failed to retrieve billing records.' });
    }
});

export default router;
