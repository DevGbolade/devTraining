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
      return editedArticle;
    } catch (err) {
      throw err;
    }
  }

  static async deleteArticle(req) {
    try {
      const deletedArticle = await Article.deleteArticle(req);
      return deletedArticle;
    } catch (err) {
      throw err;
    }
  }

  static async getOneArticle(req) {
    try {
      const article = await Article.getArticle(req);
      return article;
    } catch (err) {
      throw err;
    }
  }
}

export default ArticleService;
