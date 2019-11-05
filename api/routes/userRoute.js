import express from 'express';
import authController from '../controllers/authController';
// import userController from '../controllers/userController';
import authMiddleware from '../middlewares/authMiddleware';
import bodyValidation from '../middlewares/validation/bodyValidation';


const router = express.Router();

router.post(
  '/auth/create-user',
  authMiddleware.authenticate,
  authMiddleware.restrictTo('admin'),
  bodyValidation,
  authController.signup
);

router.post('/auth/signin', [bodyValidation], authController.signin);

export default router;
