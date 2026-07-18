import app from './app.js';
import { config } from './config.js';
import { logger } from './lib/logger.js';

const server = app.listen(config.port, () => {
    logger.info(`Fraylon API listening on http://localhost:${config.port}  (env=${config.env})`);
    logger.info(`CORS origins: ${config.corsOrigins.join(', ') || '(all)'}`);
    logger.info(`Razorpay keyId: ${config.razorpay.keyId ? config.razorpay.keyId.slice(0, 12) + '…' : '(none)'}`);
});

// Graceful shutdown
for (const sig of ['SIGINT', 'SIGTERM']) {
    process.on(sig, () => {
        logger.info(`${sig} received, shutting down…`);
        server.close(() => process.exit(0));
        setTimeout(() => process.exit(1), 10000).unref();
    });
}
