import express from 'express';
import cors from 'cors';
import corsOptions from '../utils/getCorsOptions.js';
import { getBmi } from '../services/basic.js';

const app = express();
app.use(cors());

app.post('/bmi', cors(corsOptions), (req, res) => {
  const { name, height, weight } = req.body;

  const bmi = getBmi({ name, height, weight });

  res.status(200).json(bmi);
});

export default app;
