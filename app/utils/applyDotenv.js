import dotenv from 'dotenv';

const applyDotenv = () => {
  dotenv.config();

  const { MONGO_URI, PORT, JWT_SECRET, ORIGIN } = process.env;

  return {
    MONGO_URI,
    PORT,
    JWT_SECRET,
    ORIGIN,
  };
};

export default applyDotenv;
