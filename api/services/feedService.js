import FeedModel from '../models/feedModel';

const Feed = new FeedModel('feeds');

class FeedService {
  static async getAllFeeds() {
    try {
      const feeds = await Feed.getFeeds();
      return feeds;
    } catch (err) {
      throw err;
    }
  }
}

export default FeedService;
