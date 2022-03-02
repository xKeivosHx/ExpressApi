const { ValidationError } = require('sequelize');

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

function ormErrorHandler(err, req, res, next) {
  if (err instanceof ValidationError) {
    //throw boom.conflict(err.errors[0].message);
    res.status(409).json({
      statusCode: 409,
      message: err.name,
      error: err.errors,
    });
  }
  next(err);
}

module.exports = { logErrors, errorHandler, boomErrorHandler, ormErrorHandler };
