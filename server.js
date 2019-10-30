/* eslint-disable no-console */
/* eslint-disable node/no-unsupported-features/es-syntax */
import http from 'http';
import dotenv from 'dotenv';
import { Pool } from 'pg';
import app from './app';
import keys from './api/utilities/configUtilities';

dotenv.config({ path: './config.env' });

const { port, psqlUrl, psqlTest } = keys;

const pool = new Pool({
  connectionString: process.env.NODE_ENV === 'test' ? psqlTest : psqlUrl
//   ssl: true
});

pool
  .connect()
  .then(() => console.log('Database is connected'))
  .catch(err => console.log(`Something went wrong! ${err}`));

const server = http.createServer(app);

server.listen(port, () => console.log(`Application running on port ${port}`));
