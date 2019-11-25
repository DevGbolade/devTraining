/* eslint-disable no-console */
import dotenv from 'dotenv';
import { Pool } from 'pg';

import keys from '../utilities/configUtilities';

dotenv.config();


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


const createTables = `
  DROP TABLE IF EXISTS gifs, articles, comments, feeds, categories, users CASCADE;
  CREATE TABLE IF NOT EXISTS
  users(
    userId SERIAL PRIMARY KEY,
    firstName VARCHAR(150) NOT NULL,
    lastName VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(150) NOT NULL,
    gender   VARCHAR(150) NOT NULL,
    jobRole   VARCHAR(150) NOT NULL,
    department  VARCHAR(150) NOT NULL,
    address  VARCHAR(150) NOT NULL,
    isAdmin BOOLEAN NOT NULL,
    createdOn TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP

    
  );
   CREATE TABLE IF NOT EXISTS
    categories(
      catId SERIAL PRIMARY KEY,
      catName VARCHAR(150) NOT NULL,
      catDescription TEXT NULL,
      createdOn TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      
  );

  CREATE TABLE IF NOT EXISTS
  feeds(
    feedId SERIAL PRIMARY KEY,
    authorId INTEGER NOT NULL,
    catId INTEGER NOT NULL,
    type VARCHAR(150)  NULL,
    createdOn TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(authorId) REFERENCES users(userId) ON DELETE CASCADE,
    FOREIGN KEY(catId) REFERENCES categories(catId) ON DELETE CASCADE

    
  );

  CREATE TABLE IF NOT EXISTS
  gifs(
    feedId INTEGER NOT NULL,
    title VARCHAR(150) NOT NULL,
    imageUrl  VARCHAR(255) NOT NULL,
    flagged BOOLEAN  NULL,
    createdOn TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(feedId) REFERENCES feeds(feedId) ON DELETE CASCADE

  
  );
 
  CREATE TABLE IF NOT EXISTS
  articles(
    feedId INTEGER NOT NULL,
    title VARCHAR(150) NOT NULL,
    article  VARCHAR(255) NOT NULL,
    flagged BOOLEAN  NULL,
    createdOn TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(feedId) REFERENCES feeds(feedId) ON DELETE CASCADE

  );

  CREATE TABLE IF NOT EXISTS
   comments(
    commentId SERIAL PRIMARY KEY,
    authorId INTEGER NOT NULL,
    feedId INTEGER NOT NULL,
    comment TEXT NOT NULL,
    flagged BOOLEAN  NULL,
    createdOn TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(authorId) REFERENCES users(userId) ON DELETE CASCADE,
    FOREIGN KEY(feedId) REFERENCES feeds(feedId) ON DELETE CASCADE

  );
`;

async function create() {
  try {
    await pool.query(createTables);
    console.log('Creating Tables...');
    pool.end();
  } catch (error) {
    console.log(error);
  }
}

create();
