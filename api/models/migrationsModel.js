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
pool.on('connect', () => {
  console.log('Connected to database');
});

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

    
  ); CREATE TABLE IF NOT EXISTS
  categories(
    catId SERIAL PRIMARY KEY,
    catName VARCHAR(150) NOT NULL,
    catDescription TEXT NULL,
    createdOn TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      
  );

  CREATE TABLE IF NOT EXISTS
  gifs(
    gifId SERIAL PRIMARY KEY,
    authourId INTEGER NOT NULL,
    catId INTEGER NOT NULL,
    title VARCHAR(150) NOT NULL,
    imageUrl  VARCHAR(255) NOT NULL,
    createdOn TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(authourId) REFERENCES users(userId) ON DELETE CASCADE,
    FOREIGN KEY(catId) REFERENCES categories(catId) ON DELETE CASCADE

  
  );
 
  CREATE TABLE IF NOT EXISTS
  articles(
    articleId SERIAL PRIMARY KEY, 
    authourId INTEGER NOT NULL,
    catId INTEGER NOT NULL,
    title VARCHAR(150) NOT NULL,
    article  TEXT NOT NULL,
    createdOn TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(authourId) REFERENCES users(userId) ON DELETE CASCADE

  );

  CREATE TABLE IF NOT EXISTS
   comments(
    commentId SERIAL PRIMARY KEY,
    authourId INTEGER NOT NULL,
    articleId INTEGER  NULL,
    gifId INTEGER  NULL,
    comment TEXT NOT NULL,
    flagged BOOLEAN NOT NULL,
    createdOn TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(authourId) REFERENCES users(userId) ON DELETE CASCADE,
    FOREIGN KEY(gifId) REFERENCES gifs(gifId) ON DELETE CASCADE,
    FOREIGN KEY(articleId) REFERENCES articles(articleId) ON DELETE CASCADE

  );

  CREATE TABLE IF NOT EXISTS
  feeds(
    feedId SERIAL PRIMARY KEY,
    articleId INTEGER  NULL,
    gifId INTEGER  NULL,
    createdOn TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(articleId) REFERENCES articles(articleId) ON DELETE CASCADE,
    FOREIGN KEY(gifId) REFERENCES gifs(gifId) ON DELETE CASCADE
    
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
