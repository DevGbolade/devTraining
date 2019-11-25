import http from 'http';
import dotenv from 'dotenv';
import { Pool } from 'pg';
import app from './app';
import keys from './api/utilities/configUtilities';

dotenv.config({ path: './config.env' });

const {
  port, psqlUrl, psqlTest, psqlHeroku
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


pool
  .connect()
  .then(() => console.log('Database is connected'))
  .catch((err) => console.log(`Something went wrong! ${err}`));

const server = http.createServer(app);

server.listen(port, () => console.log(`Application running on port ${port}`));
