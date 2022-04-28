import mongoose from 'mongoose';
import applyDotenv from '../utils/applyDotenv.js';
import UserModel from './User.js';

const { MONGO_URI } = applyDotenv();

mongoose.Promise = global.Promise;

export default {
  mongoose,
  url: MONGO_URI,
  User: new UserModel(mongoose),
};
