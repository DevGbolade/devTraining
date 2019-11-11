import General from './generalUtilities';

/**
 * A class for generating API responses
 */
class ResponseGenerator {
  constructor() {
    this.status = null;
    this.type = null;
    this.data = null;
    this.message = null;
  }

  /**
   * Sends response
   * @param {object} res
   * @returns {object} response
   */
  send(res) {
    const filteredResponse = General.stripNull({
      status: 'success',
      data: this.data
    });

    if (this.type === 'success') {
      return res.status(this.status).json(filteredResponse);
    }
    // Here this.type === 'error'
    return res.status(this.status).json({
      status: 'error',
      message: this.message
    });
  }

  /**
   * @description API response for 200 & 201
   * @param{int} statusCode
   * @param {object} data
   * @param{string} message
   */
  sendSuccess(res, statusCode, data, message) {
    this.status = statusCode;
    this.data = data;
    this.type = 'success';
    this.message = message;

    return this.send(res);
  }

  /**
   * @description API response for 400, 401, 403, 404, 503
   * @param{int} statusCode
   * @param{string} message
   * @param {object} data
   */
  sendError(res, statusCode, message) {
    this.status = statusCode;
    this.message = message;
    this.type = 'error';

    return this.send(res);
  }
}

export default ResponseGenerator;
