/* eslint-disable node/no-unsupported-features/es-syntax */
import express from 'express';
import authController from '../controllers/authController';
// import userController from '../controllers/userController';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router.post(
  '/auth/create-user',
  authMiddleware.authenticate,
  authMiddleware.restrictTo('admin'),
  authController.signup
);

export default router;
