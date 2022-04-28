import applyDotenv from './applyDotenv.js';

const { ORIGIN } = applyDotenv();

const corsOptions = {
  origin: ORIGIN,
  optionsSuccessStatus: 200,
};

export default corsOptions;
