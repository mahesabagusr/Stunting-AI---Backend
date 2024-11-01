import express from 'express';
import router from '../src/routes/routes.js';
import serverless from 'serverless-http';
import { config } from '../src/infra/global_config.js';

const app = express();

app.use(express.json());
app.use(router);

export const handler = serverless(app);