import express from 'express';
import gifController from '../controllers/gifController';
import authMiddleware from '../middlewares/authMiddleware';
import { multerUploads } from '../middlewares/multerCloudinaryMiddleware';


const router = express.Router();

router.post(
  '/gifs',
  authMiddleware.authenticate,
  multerUploads,
  gifController.postGif
);


export default router;
