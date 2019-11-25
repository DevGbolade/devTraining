import dotenv from 'dotenv';
import { Pool } from 'pg';

import keys from '../utilities/configUtilities';

const {
  psqlUrl, psqlTest, psqlHeroku
} = keys;

let connectionUrl;
switch (process.env.NODE_ENV) {
  case 'production':
    connectionUrl = psqlHeroku;
    break;
  case 'development':
    connectionUrl = psqlUrl;
    break;

  default:
    break;
}

const pool = new Pool({
  connectionString: process.env.NODE_ENV === 'test' ? psqlTest : connectionUrl
});
if (process.env.NODE_ENV === 'production') pool.options.ssl = true;


pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

export default pool;
