import express from 'express';
import passport from 'passport';
import morgan from 'morgan';
import applyDotenv from './app/utils/applyDotenv.js';
import getResponse from './app/utils/getResponse.js';
import applyPassport from './app/utils/applyPassport.js';
import db from './app/models/index.js';
import api from './app/routes/api.js';
import basic from './app/routes/basic.js';
import user from './app/routes/user.js';

const { MONGO_URI, PORT, JWT_SECRET } = applyDotenv();

const app = express();
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const passportInstance = applyPassport(passport, JWT_SECRET);
app.use(passportInstance.initialize());

db.mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(' ### 몽고DB 연결 성공 ### ');
  })
  .catch((err) => {
    console.log(' 몽고DB와 연결 실패', err);
    process.exit();
  });

app.use('/api', api);
app.use('/basic', basic);
app.use('/user', user);
app.use(morgan('dev'));

app.all('*', (_req, res) => getResponse.notFoundResponse(res, '페이지를 찾을 수 없습니다'));
app.use(
  (err, _req, res) =>
    err.name === 'UnauthorizedError' && getResponse.unauthorizedResponse(res, err.message)
);

app.listen(PORT, () => {
  console.log(`서버 실행 PORT : ${PORT}`);
});
