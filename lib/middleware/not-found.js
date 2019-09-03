module.exports = (req, res, next) => {
  const err = new Error('Alas, the information you seek has been lost to the sands of time.');
  err.status = 404;
  next(err);
};
