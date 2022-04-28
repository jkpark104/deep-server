/* eslint-disable consistent-return */
import db from '../models/index.js';

export default function UserService() {
  const { User } = db;

  return {
    join(req, res) {
      new User(req.body).save((err) => {
        if (err) {
          res.status(500).json({ message: err });

          return null; // return 안 해주면 next로 넘어감
        }

        res.status(200).json({ ok: 'ok' });
      });
    },

    login(req, res) {
      User.findOne(
        {
          userid: req.body.userid,
        },
        (err, user) => {
          if (err) throw err;

          if (!user) {
            res.status(401).send({ success: false, message: '해당 ID가 존재하지 않습니다' });
          } else {
            user.comparePassword(req.body.password, (_err, isMatch) => {
              if (!isMatch) {
                res.status(401).send({ message: 'FAIL' });
              } else {
                user.generateToken((error, _user) => {
                  if (error) res.status(400).send(error);
                  // 토큰을 저장한다. 어디에? 쿠키, 로컬스토리지
                  res.status(200).json(_user);
                });
              }
            });
          }
        }
      );
    },

    logout(req, res) {
      req.logout();
      res.json({ msg: 'LOG_OUT' });
    },

    checkDuplicateUserid(req, res) {
      User.findById({ userid: req.body.userid }).exec((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return null;
        }

        if (user) {
          res.status(400).send({ message: 'ID가 이미 존재합니다' });
          return null;
        }
      });
    },

    getUserById(req, res) {
      const userId = req.body.userid;

      User.findById({ userId }).exec((_err, user) => {
        res.status(200).json(user);
      });
    },

    getUsers(req, res) {
      User.find().exec((err, users) => {
        res.status(200).json(users);
      });
    },
  };
}
