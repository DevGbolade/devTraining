import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const General = {
  /**
   * @description - validate password by comparing password with hash password
   * @param {string} password
   * @param {string} hashpassword
   * @returns {boolean} boolean to show if password match or not
   */
  validate(password, userPassword) {
    return bcrypt.compareSync(password, userPassword);
  },
  /**
   * @description - encypt password
   * @param {object} password
   * @returns {object} hashpassword
   */
  hash(password) {
    const salt = bcrypt.genSaltSync(10);
    try {
      return bcrypt.hashSync(password, salt);
    } catch (error) {
      throw error;
    }
  },
  /**
   * @description - remove null key from  object
   * @param {object}
   * @returns {object}
   */
  stripNull(obj) {
    let cleanObj = {};

    Object.keys(obj).forEach((val) => {
      const newVal = obj[val];
      cleanObj = newVal ? { ...cleanObj, [val]: newVal } : cleanObj;
    });

    return cleanObj;
  },

  signToken (id){
    return jwt.sign({id}, process.env.SECRET_KEY, {expiresIn: process.env.JWT_EXPIRES_IN});
 }
};

export default General;