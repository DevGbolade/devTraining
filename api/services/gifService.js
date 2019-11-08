import GifModel from '../models/gifModel';

const Gif = new GifModel('gifs');

class gifService {
  static async addGif(req) {
    try {
      const newGif = await Gif.createNewGif(req);
      return newGif;
    } catch (err) {
      throw err;
    }
  }
}

export default gifService;
