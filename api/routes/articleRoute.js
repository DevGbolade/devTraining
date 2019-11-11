import express from 'express';
import articleController from '../controllers/articleController';
import authMiddleware from '../middlewares/authMiddleware';
import bodyValidation from '../middlewares/validation/bodyValidation';


const router = express.Router();

router.post(
  '/articles',
  authMiddleware.authenticate,
  bodyValidation,
  articleController.postArticle
);


export default router;
