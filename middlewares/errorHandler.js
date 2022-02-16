function logErrors(err, req, resp, next) {
  console.log('LogsError');
  console.log(err);
  next(err);
}

function errorHandler(err, req, resp, next) {
  console.log('ErrorHandler');
  resp.status(500).json({
    message: err.message,
    stack: err.stack,
  });
}

function boomErrorHandler(err, req, resp, next) {
  console.log('BoomErrorHandler');

  if (err.isBoom) {
    const { output } = err;
    resp.status(output.statusCode).json(output.payload);
  }
  next(err);
}

module.exports = { logErrors, errorHandler, boomErrorHandler };
