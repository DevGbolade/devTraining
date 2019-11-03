import ResponseGenerator from '../utilities/responseUtilities';
import UserService from '../services/userService';

const response = new ResponseGenerator();

class AuthController {
  /**
   * @param {object} request express request object
   * @param {object} response express request object
   * @returns {json} json
   * @memberof UserController
   */

  static async signup(req, res) {
    try {
      const user = await UserService.addUser(req);
      if (user) {
        return response.sendSuccess(res, 201, user);
      }
      return response.sendError(res, 500, 'Something went wrong');
    } catch (err) {
      return response.sendError(res, 400, err.message);
    }
  }

  static async signin(req, res) {
    try {
      const user = await UserService.login(req);
      if (user) {
        return response.sendSuccess(res, 200, user);
      }
      return response.sendError(res, 500, 'Something went wrong');
    } catch (err) {
      return response.sendError(res, 400, err.message);
    }
  }
}

export default AuthController;
