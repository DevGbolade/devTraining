import pool from '../models/indexModel';

export default class Query {
  constructor(table) {
    this.pool = pool;
    this.table = table;
  }

  /**
   * Find all documents in a table
   * @param {param}
   */
  async findAll(selector) {
    const query = `SELECT ${selector} FROM ${this.table}`;
    try {
      const response = await this.pool.query(query);
      return response;
    } catch (err) {
      throw err;
    }
  }

  /**
   * delete all documents in a table
   * @param {param}
   */
  async deleteAll(selector) {
    const query = `TRUNCATE ONLY ${selector} FROM ${this.table}`;
    try {
      const response = await this.pool.query(query);
      return response;
    } catch (err) {
      throw err;
    }
  }

  /**
   * Find a specific document by a param
   * @param {param}
   */
  async findByOneParam(paramType, param) {
    const query = `SELECT * FROM ${this.table} WHERE ${paramType}=$1`;
    try {
      const response = await this.pool.query(query, param);
      return response;
    } catch (err) {
      throw err;
    }
  }

  async findFeedId(param) {
    const query = `SELECT feeds.feedid, feeds.createdon, articles.article, feeds.authorid, feeds.type
    FROM feeds 
    INNER JOIN 
    articles ON articles.feedid = feeds.feedid
    WHERE feeds.feedid=$1
   `;
    try {
      const response = await this.pool.query(query, param);
      return response;
    } catch (err) {
      throw err;
    }
  }

  async findComments(paramType, param) {
    const query = `SELECT * FROM comments WHERE ${paramType}=$1`;
    try {
      const response = await this.pool.query(query, param);
      return response;
    } catch (err) {
      throw err;
    }
  }

  async findByOneArticle(paramType, param) {
    const query = `SELECT * FROM articles WHERE ${paramType}=$1`;
    try {
      const response = await this.pool.query(query, param);
      return response;
    } catch (err) {
      throw err;
    }
  }

  /**
   * Find a specific document by multiple params
   * @param {param}
   */

  async findByMultipleParam(
    selector1,
    selector2,
    selector3,
    selector4,
    values
  ) {
    const query = `SELECT * FROM ${this.table} WHERE ${selector1}=$1 AND ${selector2}=$2 AND ${selector3}=$3 AND ${selector4}=$4`;
    try {
      const response = await this.pool.query(query, values);
      return response;
    } catch (err) {
      throw err;
    }
  }

  /**
   * Insert into db
   * @param {bodyObject}
   */
  async insertIntoDB(columns, selector, values) {
    const query = `INSERT INTO ${this.table} (${columns}) VALUES(${selector}) RETURNING *`;
    try {
      const response = await this.pool.query(query, values);
      return response;
    } catch (err) {
      throw err;
    }
  }

  async insertIntoFeedsDb(columns, selector, values) {
    const query = `INSERT INTO feeds (${columns}) VALUES(${selector}) RETURNING *`;
    try {
      const response = await this.pool.query(query, values);
      return response;
    } catch (err) {
      throw err;
    }
  }

  async insertIntoCommentsDb(columns, selector, values) {
    const query = `INSERT INTO comments (${columns}) VALUES(${selector}) RETURNING *`;
    try {
      const response = await this.pool.query(query, values);
      return response;
    } catch (err) {
      throw err;
    }
  }

  async insertIntogifsDb(columns, selector, values) {
    const query = `INSERT INTO gifs (${columns}) VALUES(${selector}) RETURNING *`;
    try {
      const response = await this.pool.query(query, values);
      return response;
    } catch (err) {
      throw err;
    }
  }

  async insertIntoArticlesDb(columns, selector, values) {
    const query = `INSERT INTO articles (${columns}) VALUES(${selector}) RETURNING *`;
    try {
      const response = await this.pool.query(query, values);
      return response;
    } catch (err) {
      throw err;
    }
  }

  /**
   * Insert into db
   * @param {bodyObject}
   */
  async findByComment(columns, secondTable, values) {
    const query = `SELECT *
    FROM ${secondTable}
    LEFT JOIN (SELECT comment FROM ${this.table}) AS B
    ON ${secondTable}.${columns}=$1
    WHERE ${secondTable}.${columns}=$1`;
    try {
      const response = await this.pool.query(query, values);
      return response;
    } catch (err) {
      throw err;
    }
  }

  async modifyArticle(param) {
    const query = `UPDATE articles
     SET title=$1, article=$2 WHERE feedid=$3 RETURNING title, article`;
    try {
      const response = await this.pool.query(
        query,
        param,
      );
      return response;
    } catch (err) {
      throw err;
    }
  }

  async deleteByParams(paramType, param) {
    const query = `DELETE FROM  ${this.table}
      WHERE ${paramType}=$1 RETURNING *`;
    try {
      const response = await this.pool.query(
        query,
        param,
      );
      return response;
    } catch (err) {
      throw err;
    }
  }

  async getAllGifFeeds() {
    const query = `SELECT feeds.feedid, feeds.createdon, gifs.imageurl, feeds.authorid
    FROM feeds 
    iNNER JOIN gifs  ON gifs.feedid = feeds.feedid 
    ORDER BY createdon

    `;
    try {
      const response = await this.pool.query(query);
      return response;
    } catch (err) {
      throw err;
    }
  }

  async getAllArticleFeeds() {
    const query = `SELECT feeds.feedid, feeds.createdon, articles.article, feeds.authorid
    FROM feeds 
    INNER JOIN 
    articles ON articles.feedid = feeds.feedid
    ORDER BY createdon
   
    `;
    try {
      const response = await this.pool.query(query);
      return response;
    } catch (err) {
      throw err;
    }
  }
}
