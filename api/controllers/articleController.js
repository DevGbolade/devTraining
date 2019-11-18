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
      if (article.title) {
        return response.sendSuccess(res, 201, article);
      }
      if (article.status === 'error') {
        return res.status(403).json({
          status: article.status,
          messsage: article.message
        });
      }
      return response.sendError(res, 500, 'Something went wrong');
    } catch (err) {
      if (err.message === "Cannot read property 'title' of undefined") {
        return res.status(404).json({
          status: 'error',
          message: 'there is no Article with that ID',
          error: err.message
        });
      }
      return response.sendError(res, 400, err.message);
    }
  }

  static async deleteArticle(req, res) {
    try {
      const deletedArticle = await ArticleService.deleteArticle(req);
      if (deletedArticle.feedid) {
        return response.sendSuccess(res, 200,
          { message: 'Article successfully Deleted' });
      }
      if (deletedArticle.status === 'error') {
        return res.status(403).json({
          status: deletedArticle.status,
          messsage: deletedArticle.message
        });
      }
      return response.sendError(res, 500, 'Something went wrong');
    } catch (err) {
      if (err.message === "Cannot read property 'authorid' of undefined") {
        return res.status(404).json({
          status: 'error',
          message: 'there is no Article with that ID',
        });
      }
      return response.sendError(res, 400, err.message);
    }
  }

  static async getOneArticle(req, res) {
    try {
      const article = await ArticleService.getOneArticle(req);
      if (article) {
        return response.sendSuccess(res, 200, article);
      }
      return response.sendError(res, 500, 'Something went wrong');
    } catch (err) {
      if (err.message === "Cannot read property 'feedid' of undefined") {
        return res.status(404).json({
          status: 'error',
          message: 'there is no Article with that ID',
        });
      }
      return response.sendError(res, 400, err.message);
    }
  }
}

export default ArticleController;
