import Joi from '@hapi/joi';

const id = Joi.number()
  .integer()
  .positive()
  .min(1)
  .required();

const ArticleIdSchema = Joi.object({
  articleId: id.error(new Error('articleId is required and must be an integer'))
});
const gifIdSchema = Joi.object({
  gifId: id.error(new Error('gifId is required and must be an integer'))
});

export default {
  '/articles/:articleId': ArticleIdSchema,
  '/gifs/:gifId': gifIdSchema
};
