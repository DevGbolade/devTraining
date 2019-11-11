import multer from 'multer';
import Datauri from 'datauri';
import path from 'path';
import Cloudinary from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config({ path: '../../config.env' });
const { config, uploader } = Cloudinary.v2;

/**
* @description This function handles multipart/data-form
* @param {Object} req containing the file object
* @returns {String} The data is passed on the req object
*/

const cloudinaryConfig = (req, res, next) => {
  config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });
  next();
};


const storage = multer.memoryStorage();
const multerUploads = multer({ storage }).single('imageUrl');

/**
* @description This function converts the buffer to data url
* @param {Object} req containing the field object
* @returns {String} The data url from the string buffer
*/
const dUri = new Datauri();
const dataUri = (req) => dUri
  .format(path.extname(req.file.originalname)
    .toString(), req.file.buffer);


export {
  multerUploads,
  dataUri,
  cloudinaryConfig,
  uploader
};
