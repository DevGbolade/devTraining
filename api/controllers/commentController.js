import ResponseGenerator from '../utilities/responseUtilities';
import CommentService from '../services/commentService';

const response = new ResponseGenerator();

class CommentController {
  /**
     * @param {object} request express request object
     * @param {object} response express request object
     * @returns {json} json
     * @memberof UserController
     */

  static async createComment(req, res) {
    try {
      const comment = await CommentService.addComment(req);

      if (comment) {
        return response.sendSuccess(res, 201, comment);
      }
      return response.sendError(res, 500, 'Something went wrong');
    } catch (err) {
      return response.sendError(res, 400, err.message);
    }
  }
}


export default CommentController;
