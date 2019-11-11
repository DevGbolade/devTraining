import ArticleModel from '../models/articleModel';

const Article = new ArticleModel('feeds');

class gifService {
  static async addArticle(req) {
    try {
      const newArticle = await Article.createNewArticle(req);
      return newArticle;
    } catch (err) {
      throw err;
    }
  }
}

export default gifService;
