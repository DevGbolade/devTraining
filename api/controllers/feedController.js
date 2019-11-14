import ResponseGenerator from '../utilities/responseUtilities';
import FeedService from '../services/feedService';

const response = new ResponseGenerator();

class FeedController {
  /**
     * @param {object} request express request object
     * @param {object} response express request object
     * @returns {json} json
     * @memberof UserController
     */

  static async getAllFeeds(req, res) {
    try {
      const feeds = await FeedService.getAllFeeds();

      if (feeds) {
        return response.sendSuccess(res, 200, feeds);
      }
      return response.sendError(res, 500, 'Something went wrong');
    } catch (err) {
      return response.sendError(res, 400, err.message);
    }
  }
}


export default FeedController;
