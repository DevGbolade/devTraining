/* eslint-disable no-console */
import dotenv from 'dotenv';
import { Pool } from 'pg';

import keys from '../utilities/configUtilities';

dotenv.config();


const tableSeeds = `
  INSERT INTO
    users
      VALUES 
      ( default,'Rasak', 'Adeniyi', 'raadeniyi3@gmail.com',  '$2a$10$YdtuirOmFW3O5knqqtnya..I7aNcZZ/ypEW7Hyka9F6.5cuggZmAq', 'male', 'admin', 'administrative', '06 osborne estate ikoyi', ${true}),
      (default,'Agbolade', 'Adeniyi', 'raxqy5@gmail.com',  '$2a$10$YdtuirOmFW3O5knqqtnya..I7aNcZZ/ypEW7Hyka9F6.5cuggZmAq', 'male', 'hr', 'human resource', '06 osborne estate ikoyi', ${true}),
      (default, 'Agbolade', 'Adeniyi', 'raadeniyi70@gmail.com',  '$2a$10$YdtuirOmFW3O5knqqtnya..I7aNcZZ/ypEW7Hyka9F6.5cuggZmAq', 'male', 'clerk', 'management', '06 osborne estate ikoyi', ${true});

      INSERT INTO
      categories
        VALUES 
        ( 1, 'sport', 'talk about sport' ),
        ( 2, 'political', 'talk about politics' );


      INSERT INTO
      feeds
        VALUES 
        ( 1, 1, 1, 'gif'),
        ( 2, 2, 2, 'article'),
        ( 3, 1, 1, 'gif'),
        ( 4, 2, 2, 'article');

    
  INSERT INTO
    articles
      VALUES 
      ( 2, 'birtday party', 'come and celebrate with me', false),
      ( 4, 'wedding party', 'come and celebrate my wedding with me', false);

    
  INSERT INTO
    gifs
      VALUES 
      ( 1, 'politics of the day', 'https://tenor.com/view/download-downloading-gif-11879073', false),
      ( 3, 'sports higlight', 'https://tenor.com/view/mail-download-send-letter-email-gif-12348454', false);

    

INSERT INTO
    comments
      VALUES 
      ( default, 1, 1, 'nice article', false),
      ( default, 2, 2, 'nice gif post', false);



      
`;

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


pool.on('connect', () => {
  console.log('Database connection has been established');
});

async function seeder() {
  await pool.query(tableSeeds);
  console.log('Tables are being seeded...');
  pool.end();
}
seeder();
