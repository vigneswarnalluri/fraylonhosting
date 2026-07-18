import serverless from 'serverless-http';
import app from '../../server/app.js';

const expressApp = app.default || app;
export const handler = serverless(expressApp);
