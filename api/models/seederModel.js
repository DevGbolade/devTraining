/* eslint-disable no-console */
/* eslint-disable node/no-unsupported-features/es-syntax */
import dotenv from 'dotenv';
import { Pool } from 'pg';

import keys from '../utilities/configUtilities';

const { psqlUrl, psqlTest } = keys;

const tableSeeds = `
  INSERT INTO
    users
      VALUES 
      ( 1, 'Rasak', 'Adeniyi', 'raadeniyi3@gmail.com',  '$2a$12$IBnZoft9F19ae5YDPFEjn.tnyLHftihBEDmwW7uXG4Gkh1CyIMgTu', 'male', 'admin', 'hr', '06 osborne estate ikoyi', ${true}),
      ( 2, 'Agbolade', 'Adeniyi', 'raxqy5@gmail.com',  '$2a$12$9nFqToiTmjgfFVJiQvjmreLt4k8X4gGYCETGapSZOb2hHa55t0dDq', 'male', 'admin', 'hr', '06 osborne estate ikoyi', ${true});
  INSERT INTO
    articles
      VALUES 
      ( default, 1, 1, 'its my birthday', 'come and celebrate with me'),
      ( default, 2, 2,  'its my wedding', 'come and chop life');
    
  INSERT INTO
    gifs
      VALUES 
      ( default, 1, 1, 'its my birthday', 'https://tenor.com/view/download-downloading-gif-11879073'),
      ( default, 2, 2, 'its my birthday', 'https://tenor.com/view/mail-download-send-letter-email-gif-12348454');
INSERT INTO
    comments
      VALUES 
      ( default, 9, 1, '','nice article', false),
      ( default, 9, '', 2 ,'nice gif post', false);

INSERT INTO
    feeds
      VALUES 
      ( default, 1, ''),
      ( default, '', 2);

INSERT INTO
    categories
      VALUES 
      ( default, 'sport', 'talk about sport' ),
      ( default, 'political', 'talk about politics' );      
`;

dotenv.config();
const pool = new Pool({
  connectionString: process.env.NODE_ENV === 'test' ? psqlTest : psqlUrl
});

pool.on('connect', () => {
  console.log('Database connection has been established');
});

async function seeder() {
  await pool.query(tableSeeds);
  console.log('Tables are being seeded...');
  pool.end();
}
seeder();
