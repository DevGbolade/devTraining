import ResponseGenerator from '../utilities/responseUtilities';
import ArticleService from '../services/articleService';

const response = new ResponseGenerator();

class ArticleController {
  /**
     * @param {object} request express request object
     * @param {object} response express request object
     * @returns {json} json
     * @memberof UserController
     */

  static async postArticle(req, res) {
    try {
      const article = await ArticleService.addArticle(req);

      if (article) {
        return response.sendSuccess(res, 201, article);
      }
      return response.sendError(res, 500, 'Something went wrong');
    } catch (err) {
      return response.sendError(res, 400, err.message);
    }
  }

  static async editArticle(req, res) {
    try {
      const article = await ArticleService.editArticle(req);
      if (article) {
        return response.sendSuccess(res, 201, article);
      }
      return response.sendError(res, 500, 'Something went wrong');
    } catch (err) {
      return response.sendError(res, 400, err.message);
    }
  }

  static async deleteArticle(req, res) {
    try {
      const deletedArticle = await ArticleService.deleteArticle(req);
      if (deletedArticle) {
        return response.sendSuccess(res, 201, deletedArticle);
      }
      return response.sendError(res, 500, 'Something went wrong');
    } catch (err) {
      return response.sendError(res, 400, err.message);
    }
  }
}

export default ArticleController;
