import express from 'express';
import cors from 'cors';
import passport from 'passport';
import corsOptions from '../utils/getCorsOptions.js';
import UserService from '../services/user.js';

const app = express();
app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept');
  next();
});

app.post('/join', cors(corsOptions), (req, res) => {
  UserService().join(req, res);
});

app.post('/login', cors(corsOptions), (req, res) => {
  UserService().login(req, res);
});

app.get('/logout', passport.authenticate('jwt', { session: false }), (req, res) => {
  UserService().logout(req, res);
});

app.get('/getUsers', cors(corsOptions), (req, res) => {
  UserService().getUsers(req, res);
});

export default app;
