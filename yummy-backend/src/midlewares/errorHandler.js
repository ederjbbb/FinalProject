const HttpStatus = require('http-status-codes');
const { isDev } = require('../constants/environment');

const errorHandler = (err, req, res, next) => {
  if (err) {
    const badRequestException = err.stack && err.stack.includes('Sequelize');

    if (badRequestException)
      err.code = HttpStatus.BAD_REQUEST;

    const message = (err?.errors || [])[0]?.message;
    const error = {
      message: message ? message : err.message,
      stack: isDev ? err.stack : {},
      error: isDev ? err : {},
    };
    res
      .status(err.code || HttpStatus.INTERNAL_SERVER_ERROR)
      .send(error);
  }

}

module.exports = errorHandler;