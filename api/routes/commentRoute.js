import express from 'express';
import commentController from '../controllers/commentController';
import authMiddleware from '../middlewares/authMiddleware';


const router = express.Router({ mergeParams: true });

router.post(
  '/',
  authMiddleware.authenticate,
  commentController.createComment
);


export default router;
