import express from 'express';
import { orderRepo } from '../lib/db.js';
import { logger } from '../lib/logger.js';

const router = express.Router();

// Retrieve orders for a specific customer email
router.get('/orders', async (req, res) => {
    const { email } = req.query;

    if (!email || !email.trim()) {
        return res.status(400).json({ error: "Email query parameter is required." });
    }

    try {
        logger.info(`Fetching orders for user email: ${email}`);
        const orders = await orderRepo.findByEmail(email.trim().toLowerCase());
        res.json({ orders });
    } catch (err) {
        logger.error(`Error fetching orders for ${email}:`, err);
        res.status(500).json({ error: "Failed to retrieve billing records." });
    }
});

export default router;
