import Query from '../utilities/psqlUtilities';

class Article extends Query {
  async createNewArticle(req) {
    try {
      const { rows } = await this.insertIntoDB(
        'authorId, catId, type',
        '$1, $2, $3',
        [
          req.userId,
          req.body.catId,
          'artcle',
        ]
      );
      const newArticle = await this.insertIntoArticlesDb(
        'feedId, title, article, flagged',
        '$1, $2, $3, $4',
        [
          rows[0].feedid,
          req.body.title,
          req.body.article,
          false
        ]
      );
      return {
        message: 'Article successfully posted',
        title: newArticle.rows[0].title,
        article: newArticle.rows[0].article,
        createdOn: newArticle.rows[0].createdon
      };
    } catch (err) {
      throw err;
    }
  }

  async editArticle(req) {
    try {
      const { rows } = await this.modifyArticle(
        [
          req.body.title,
          req.body.article,
          req.params.articleId
        ]
      );
      return rows[0];
    } catch (error) {
      throw error;
    }
  }
}


export default Article;
