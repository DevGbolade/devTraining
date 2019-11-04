/* eslint-disable no-console */
/* eslint-disable node/no-unsupported-features/es-syntax */
import dotenv from 'dotenv';
import { Pool } from 'pg';

import keys from '../utilities/configUtilities';

const { psqlUrl, psqlTest } = keys;
dotenv.config();

const pool = new Pool({
  connectionString: process.env.NODE_ENV === 'test' ? psqlTest : psqlUrl
});

pool.on('error', err => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

export default pool;