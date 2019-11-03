import Joi from '@hapi/joi';

const date = Joi.date();

const string = Joi.string().regex(/^\D+$/);

const email = Joi.string()
  .email()
  .lowercase()
  .required();

const password = Joi.string()
  .min(6)
  .required()
  .strict();

const id = Joi.number()
  .integer()
  .positive()
  .min(1)
  .required();

const createUserSchema = Joi.object({
  firstName: string.required(),
  lastName: string.required(),
  email,
  password,
  gender: string.required(),
  jobRole: string.required(),
  department: string.required(),
  address: string.required(),
  isAdmin: Joi.boolean().default(false, {
    invalid: false
  })
});

const signinUserSchema = Joi.object({
  email,
  password
});

const createArticleSchema = Joi.object({
  catId: Joi.number()
    .positive()
    .min(1)
    .precision(0)
    .error(new Error('Catgory Id is required and must be an integer'))
    .required(),
  title: string
    .error(new Error('Article title is required and must be a string'))
    .required(),
  article: string
    .error(new Error('Article content is required and must be a string'))
    .required()
});

const createGifSchema = Joi.object({
  catId: Joi.number()
    .positive()
    .min(1)
    .precision(0)
    .error(new Error('Catgory Id is required and must be an integer'))
    .required(),
  title: string
    .error(new Error('Gif title is required and must be a string'))
    .required(),
  imageUrl: string
    .error(new Error('Gif content is required and must be a url'))
    .required()
});

const makeCommentSchema = Joi.object({
  comment: string
    .error(new Error('Gif title is required and must be a string'))
    .required()
});

export default {
  '/auth/create-user': createUserSchema,
  '/auth/signin': signinUserSchema,
  '/articles': createArticleSchema,
  '/gifs': createGifSchema,
  '/comments': makeCommentSchema
};
