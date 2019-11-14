import CommentModel from '../models/commentModel';

const Comment = new CommentModel('comments');

class CommentService {
  static async addComment(req) {
    try {
      const newComment = await Comment.createComment(req);
      return newComment;
    } catch (err) {
      throw err;
    }
  }
}

export default CommentService;
