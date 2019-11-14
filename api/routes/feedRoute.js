import express from 'express';
import feedController from '../controllers/feedController';
import authMiddleware from '../middlewares/authMiddleware';


const router = express.Router({ mergeParams: true });

router.get(
  '/feed',
  authMiddleware.authenticate,
  feedController.getAllFeeds
);


export default router;
