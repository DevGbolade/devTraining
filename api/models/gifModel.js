import Query from '../utilities/psqlUtilities';
import { uploader, dataUri } from '../middlewares/multerCloudinaryMiddleware';

class Gif extends Query {
  async createNewGiif(req) {
    try {
      const { rows } = await this.insertIntoDB(
        'authourId, catId, title, imageUrl, flagged',
        '$1, $2, $3, $4, $5',
        [
          req.userId,
          req.body.catId,
          req.body.title,
          req.body.imageUrl,
          req.body.flagged
        ]
      );
      if (rows[0]) {
        await this.insertIntoFeedsDb(
          'gifId',
          '$1',
          [
            rows[0].gifid
          ]
        );
      }
      return rows[0];
    } catch (err) {
      throw err;
    }
  }

  async createNewGif(req) {
    // function gif() {
    let image;
    // if (req.file) {
    const file = dataUri(req).content;
    return uploader.upload(file).then((result) => {
      image = result.url;
      this.insertIntoDB(
        'authourId, catId, title, imageUrl, flagged',
        '$1, $2, $3, $4, $5',
        [
          req.userId,
          req.body.catId,
          req.body.title,
          image,
          req.body.flagged
        ]
      ).then((res) => {
        if (res.rows[0]) {
          this.insertIntoFeedsDb(
            'gifId',
            '$1',
            [
              res.rows[0].gifid
            ]
          );
        }
        // console.log(res.rows[0]);
        return res.rows[0];
      }).catch((err) => console.log(err));
    });
  }
}


export default Gif;
