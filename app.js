require('dotenv').config();

const { PORT } = process.env;

const cors = require('cors');

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
};

const express = require('express');

const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const routers = ['basic'];
routers.forEach((router) => {
  require(`./app/routes/${router}.route`)({ url: `/api/${router}`, app });
});

app.listen(PORT, () => {
  console.log(`서버 실행 PORT : ${PORT}`);
});

app.get('/api/now', cors(corsOptions), (req, res) => {
  res.json({ now: new Date().toLocaleString() });
});
