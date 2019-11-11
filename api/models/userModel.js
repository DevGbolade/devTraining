import Query from '../utilities/psqlUtilities';

class User extends Query {
  async findUserByEmail(email) {
    try {
      const { rows } = await this.findByOneParam('email', [email]);
      return rows[0];
    } catch (err) {
      throw err;
    }
  }

  async createANewUser(req, isAdmin, password) {
    try {
      const { rows } = await this.insertIntoDB(
        'email, firstName, lastName, isAdmin, password, jobRole, gender, department, address',
        '$1, $2, $3, $4, $5, $6, $7, $8, $9',
        [
          req.email,
          req.firstName,
          req.lastName,
          isAdmin,
          password,
          req.jobRole,
          req.gender,
          req.department,
          req.address,
        ]
      );
      return rows[0];
    } catch (err) {
      throw err;
    }
  }
}

export default User;
