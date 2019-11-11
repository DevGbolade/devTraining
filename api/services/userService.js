import UserModel from '../models/userModel';
import GeneralUtils from '../utilities/generalUtilities';
import Auth from '../middlewares/authMiddleware';

const User = new UserModel('users');
class Userservice {
  /** Add user to the db
   * @description Operate on an employee/admin and his/her account
   * @param {object} a new user object
   */

  static async addUser(req) {
    try {
      const foundUser = await User.findUserByEmail(req.body.email);
      if (foundUser) {
        throw new Error('Email is already in use');
      }
      const { jobRole } = req.body;
      const password = await GeneralUtils.hash(req.body.password);
      const newUser = await User.createANewUser(req.body, false, password);
      const token = Auth.signJwt({ userId: newUser.userid, jobRole });
      return {
        message: 'User account successfully created',
        token,
        userId: newUser.userid,
        firstName: newUser.firstname,
        lastName: newUser.lastname,
        jobRole: newUser.jobrole,
        email: newUser.email,
      };
    } catch (err) {
      throw err;
    }
  }


  /** Signs user into account
   * @description signs user into their account
   * @body {object} a new user object
   */

  static async login(req) {
    try {
      const foundUser = await User.findUserByEmail(req.body.email);
      if (foundUser) {
        const bycrptResponse = GeneralUtils.validate(
          req.body.password,
          foundUser.password
        );
        if (bycrptResponse) {
          const {
            userid, firstname, lastname, jobrole, email,
          } = foundUser;
          const token = await Auth.signJwt({
            userid,
            jobrole,
          });
          return {
            token,
            userId: userid,
            firstName: firstname,
            lastName: lastname,
            email,
            jobRole: jobrole,
          };
        }
      }
      throw new Error('Invalid credentials');
    } catch (err) {
      throw err;
    }
  }
}

export default Userservice;
