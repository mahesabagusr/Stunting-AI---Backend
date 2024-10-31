import express from 'express';
import router from './src/routes/routes.js'
import { config } from './src/infra/global_config.js';

const app = express();

// app.use((req, res, next) => {
//   // res.setHeader('Access-Control-Allow-Origin', '*'); // or '*' for any origin
//   // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   // res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//   // res.setHeader('Access-Control-Allow-Credentials', 'true');
//   // next();
// });

app.use(express.json());
app.use(router);

const port = config.port || 3000;

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});

