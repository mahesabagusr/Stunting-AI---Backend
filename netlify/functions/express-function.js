import serverless from 'serverless-http';
import app from '../../index.js'; // Import the Express app

export const handler = serverless(app);