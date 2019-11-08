import ResponseGenerator from '../utilities/responseUtilities';
import GifService from '../services/gifService';

const response = new ResponseGenerator();

class GifController {
  /**
     * @param {object} request express request object
     * @param {object} response express request object
     * @returns {json} json
     * @memberof UserController
     */

  static async postGif(req, res) {
    try {
      const gif = await GifService.addGif(req);
      console.log(gif);

      // if (gif) {
      return response.sendSuccess(res, 201, gif);
      // }
      // return response.sendError(res, 500, 'Something went wrong');
    } catch (err) {
      return response.sendError(res, 400, err.message);
    }
  }
}

export default GifController;
