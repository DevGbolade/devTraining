/* eslint-disable node/no-unsupported-features/es-syntax */
const catchAsync = fn => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

export default catchAsync;
