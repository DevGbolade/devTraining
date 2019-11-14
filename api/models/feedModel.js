import Query from '../utilities/psqlUtilities';

class Feeds extends Query {
  async getFeeds() {
    try {
      const articles = await this.getAllArticleFeeds();
      const gif = await this.getAllGifFeeds();
      const feeds = articles.rows.concat(gif.rows);
      const sortedFeeds = feeds.sort((a, b) => b.createdon - a.createdon);
      return sortedFeeds;
    } catch (err) {
      throw err;
    }
  }
}

export default Feeds;
