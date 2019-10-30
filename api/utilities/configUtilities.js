/* eslint-disable prettier/prettier */
/* eslint-disable node/no-unsupported-features/es-syntax */
import dotenv from 'dotenv';

dotenv.config({ path: './config.env' });

const keys = {
  port: process.env.PORT,
  secret: process.env.SECRET_KEY,
  psqlUrl: process.env.DATABASE_URL,
  psqlTest: process.env.DATABASE_TEST_URL,
  psqlHeroku: process.env.DATABASE_ONLINE
};

export default keys;  
