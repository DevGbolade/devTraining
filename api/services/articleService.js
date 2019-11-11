import ArticleModel from '../models/articleModel';

const Article = new ArticleModel('feeds');

class ArticleService {
  static async addArticle(req) {
    try {
      const newArticle = await Article.createNewArticle(req);
      return newArticle;
    } catch (err) {
      throw err;
    }
  }

  static async editArticle(req) {
    try {
      const editedArticle = await Article.editArticle(req);

      return {
        title: editedArticle.title,
        article: editedArticle.article
      };
    } catch (err) {
      throw err;
    }
  }

  static async deleteArticle(req) {
    try {
      await Article.deleteArticle(req);
      return {
        message: 'Article Successfully Deleted'
      };
    } catch (err) {
      throw err;
    }
  }
}

export default ArticleService;
