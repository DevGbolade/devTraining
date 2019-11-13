import Query from '../utilities/psqlUtilities';

class Comment extends Query {
  async createComment(req) {
    try {
      const { rows } = await this.insertIntoDB(
        'authorid, feedid, comment, flagged',
        '$1, $2, $3, $4',
        [
          req.userId,
          req.params.articleId,
          req.body.comment,
          false
        ]
      );
      const article = await this.findByOneArticle(
        'feedid',
        [rows[0].feedid]
      );
      return {
        message: 'Comment successfully created',
        articleTitle: article.rows[0].title,
        article: article.rows[0].article,
        comment: rows[0].comment,
        createdOn: rows[0].createdon
      };
    } catch (err) {
      throw err;
    }
  }
}

export default Comment;
