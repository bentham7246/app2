class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    //stack trace give complete track of error e.g error line
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
