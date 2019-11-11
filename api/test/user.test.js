/* eslint-disable no-undef */
import chai from 'chai';

import chaiHttp from 'chai-http';

import app from '../../app';

chai.use(chaiHttp);
chai.should();

let adminToken;
let employeeToken;

const newEmployee = {
  email: 'Agbolade33@gmail.com',
  firstName: 'rasak',
  lastName: 'Adeniyi',
  password: '12345678',
  isAdmin: false,
  department: 'hr',
  jobRole: 'associate',
  gender: 'male',
  address: 'abagbon close victoria island'

};
const newEmployee2 = {
  email: 'raadeniyi3@gmail.com',
  firstName: 'rasak',
  lastName: 'Adeniyi',
  password: '12345678',
  isAdmin: false,
  department: 'hr',
  jobRole: 'associate',
  gender: 'male',
  address: 'abagbon close victoria island'

};
const admin = {
  password: '12345678',
  email: 'raadeniyi3@gmail.com'
};

const employee = {
  password: '12345678',
  email: 'raxqy5@gmail.com'
};

/**
 * things to test for
 * only admin can create Employee
 *
 */
describe('Test user signup and login ', () => {
  describe('POST /auth/create-user', () => {
    it("it should not create a new Employee cos you're not logged in", (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/create-user')
        .send(newEmployee)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql('error');
          res.body.should.have.property('message').eql('Please make sure your request has an authorization header');
          done();
        });
    });
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
    it('it should throw an error because of wrong password', (done) => {
      const payload = {
        password: 'wrongpassword',
        email: 'raadeniyi3@gmail.com',
      };
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send(payload)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Invalid credentials');
          done();
        });
    });
    it('it should throw an error because of wrong email', (done) => {
      const payload = {
        password: '12345678',
        email: 'raade@gmail.com',
      };
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send(payload)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Invalid credentials');
          done();
        });
    });
    it('An employee should not be able to create a new employee', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/create-user')
        .set('Authorization', `Bearer ${employeeToken}`)
        .send(newEmployee)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql('error');
          res.body.should.have.property('message').eql('Authorized for only Admins');
          done();
        });
    });
    it('it should signin an Admin and return an authentication token', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/signin')
        .send(admin)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.data.should.have.property('userId');
          res.body.data.should.have.property('firstName');
          res.body.data.should.have.property('lastName');
          res.body.data.should.have.property('token');
          res.body.data.should.have.property('email');
          res.body.data.should.have.property('jobRole').eql('admin');
          const { token } = res.body.data;
          adminToken = token;
          done();
        });
    });
    it('An Admin should be able to create a new employee', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/create-user')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(newEmployee)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.data.should.have.property('message').eql('User account successfully created');
          res.body.data.should.have.property('userId');
          res.body.data.should.have.property('firstName');
          res.body.data.should.have.property('lastName');
          res.body.data.should.have.property('token');
          res.body.data.should.have.property('email');
          done();
        });
    });
    it('it should throw error because email is already taken', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/create-user')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(newEmployee2)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Email is already in use');
          done();
        });
    });
    it('it should throw error because of missing email', (done) => {
      const badRequest = {
        firstName: 'rasak',
        lastName: 'Adeniyi',
        password: '12345678',
        isAdmin: false,
        department: 'hr',
        jobRole: 'associate',
        gender: 'male',
        address: 'abagbon close victoria island'
      };
      chai
        .request(app)
        .post('/api/v1/auth/create-user')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(badRequest)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('email is required');
          done();
        });
    });
    it('it should throw error because of missing firstName', (done) => {
      const badRequest = {
        email: 'agbolade3@gmail.com',
        lastName: 'Adeniyi',
        password: '12345678',
        isAdmin: false,
        department: 'hr',
        jobRole: 'associate',
        gender: 'male',
        address: 'abagbon close victoria island'
      };
      chai
        .request(app)
        .post('/api/v1/auth/create-user')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(badRequest)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('firstName is required');
          done();
        });
    });
    it('it should throw error because of missing firstName', (done) => {
      const badRequest = {
        email: 'agbolade3@gmail.com',
        firstName: 'Adeniyi',
        password: '12345678',
        isAdmin: false,
        department: 'hr',
        jobRole: 'associate',
        gender: 'male',
        address: 'abagbon close victoria island'
      };
      chai
        .request(app)
        .post('/api/v1/auth/create-user')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(badRequest)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('lastName is required');
          done();
        });
    });
    it('it should throw error because of wrong email type', (done) => {
      const badRequest = {
        email: 'raadeniyi',
        firstName: 'rasak',
        lastName: 'Adeniyi',
        password: '12345678',
        isAdmin: false,
        department: 'hr',
        jobRole: 'associate',
        gender: 'male',
        address: 'abagbon close victoria island'
      };
      chai
        .request(app)
        .post('/api/v1/auth/create-user')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(badRequest)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('email must be a valid email');
          done();
        });
    });
    it('it should throw error because of short password', (done) => {
      const badRequest = {
        email: 'raadeniyi3@gmail.com',
        firstName: 'rasak',
        lastName: 'Adeniyi',
        password: '123',
        isAdmin: false,
        department: 'hr',
        jobRole: 'associate',
        gender: 'male',
        address: 'abagbon close victoria island'
      };
      chai
        .request(app)
        .post('/api/v1/auth/create-user')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(badRequest)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('password length must be at least 6 characters long');
          done();
        });
    });
  });
});
