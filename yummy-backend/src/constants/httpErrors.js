const HttpStatus = require('http-status-codes');

const createHttpError = (code, msg) => {
    const error = new Error(msg || HttpStatus.getStatusText(code));
    error.code = code;
    return error;
}

/* List of http errors wrapped with exceptions */
const NotFound = createHttpError(HttpStatus.NOT_FOUND);
const InternalServerError = createHttpError(HttpStatus.INTERNAL_SERVER_ERROR);
const BadRequest = createHttpError(HttpStatus.BAD_REQUEST);
const Unauthorized = createHttpError(HttpStatus.UNAUTHORIZED);
const Forbidden = createHttpError(HttpStatus.FORBIDDEN);
const BadRequestWithMsg = (msg) => createHttpError(HttpStatus.BAD_REQUEST, msg);

module.exports = {
    NotFound,
    InternalServerError,
    BadRequest,
    Unauthorized,
    Forbidden,
    BadRequestWithMsg
}