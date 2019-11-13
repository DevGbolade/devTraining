import express from 'express';
import articleController from '../controllers/articleController';
import authMiddleware from '../middlewares/authMiddleware';
import bodyValidation from '../middlewares/validation/bodyValidation';
import commentRoute from './commentRoute';


const router = express.Router();
router.use('/articles/:articleId/comments', commentRoute);

router.post(
  '/articles',
  authMiddleware.authenticate,
  bodyValidation,
  articleController.postArticle
);

router
  .route('/articles/:articleId')
  .get(authMiddleware.authenticate,
    bodyValidation,
    articleController.getOneArticle)
  .patch(
    authMiddleware.authenticate,
    bodyValidation,
    articleController.editArticle
  )
  .delete(
    authMiddleware.authenticate,
    bodyValidation,
    articleController.deleteArticle
  );

export default router;
