import express from 'express';
import cors from 'cors';
import corsOptions from '../utils/getCorsOptions.js';

const app = express();
app.use(cors());

app.get('/now', cors(corsOptions), (req, res) => {
  res.json({ now: new Date().toLocaleString() });
});

export default app;
