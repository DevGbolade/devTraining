/* eslint-env mocha */

import chai from 'chai';

import chaiHttp from 'chai-http';

import app from '../../app';

chai.use(chaiHttp);
chai.should();

let employeeToken;
const expiredToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJtYWNva2FiYTk5QGdtYWlsLmNvbSIsImFkbWluIjp0cnVlLCJpYXQiOjE1NjEzNzcwNzksImV4cCI6MTU2MTQ2MzQ3OX0.V3pac02NZLFvqTxT8xyLBLxdxlrpkb-V93VGWI671sM';
const invalidToken = 'UzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJtYWNva2FiYTk5QGdtYWlsLmNvbSIsImFkbWluIjp0cnVlLCJpYXQiOjE1NjEzNzcwNzksImV4cCI6MTU2MTQ2MzQ3OX0.V3pac02NZLFvqTxT8xyLBLxdxlrpkb-V93VGWI671sM';

const employee = {
  password: '12345678',
  email: 'raxqy5@gmail.com'
};

describe('Test for creating and posting Gifs', () => {
  it('it should signin an Employee and return an authentication token', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send(employee)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.data.should.have.property('userId');
        res.body.data.should.have.property('firstName');
        res.body.data.should.have.property('lastName');
        res.body.data.should.have.property('token');
        res.body.data.should.have.property('email');
        res.body.data.should.have.property('jobRole').eql('hr');
        const { token } = res.body.data;
        employeeToken = token;
        done();
      });
  });
});
