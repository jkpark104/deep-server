import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import applyDotenv from '../utils/applyDotenv.js';

export default function UserModel(mongoose) {
  const { JWT_SECRET } = applyDotenv();

  const userSchema = mongoose.Schema({
    userid: String,
    password: String,
    email: String,
    name: String,
    phone: String,
    birth: String,
    address: String,
    token: String,
  });

  userSchema.methods.comparePassword = function comparePassword(plainPassword, cb) {
    bcrypt.compare(plainPassword, this.password, (err) =>
      err ? cb(err) : cb(null, plainPassword === this.password)
    );
  };

  userSchema.methods.generateToken = function generateToken(cb) {
    // json web token 이용하여 token 생성하기 user id 와 두번째 param 으로 토큰을 만들고, param 을 이용하여
    // 나중에 userid를 찾아낸다.
    this.token = jwt.sign(this._id.toHexString(), JWT_SECRET);

    this.save((err, user) => (err ? cb(err) : cb(null, user)));
  };

  userSchema.statics.findByToken = function findByToken(token, cb) {
    // userid를 찾으면 위에서 secret으로 넣어준다. 여기서 decode는 user_id(위에서 넘겨준)가 될 것이다.
    // jwt.verify(token, JWT_SECRET, (_err, decode) => {
    // 이 아이디와 토큰을 가진 유저를 찾는다.
    // this.findOne({ _id: decode, token }, (err, user) => (err ? cb(err) : cb(null, user)));
    // });
  };

  return mongoose.model('User', userSchema);
}
