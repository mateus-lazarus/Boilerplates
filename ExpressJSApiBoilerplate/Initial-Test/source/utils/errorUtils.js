export const createError = (status, message) => {
  const error = new Error();
  error.status = status;
  error.message = message;
};

export const generalErrorHandler = (error, req, res, next) => {
  const statusCode = error.status || 500;

  res.status(statusCode);

  res.json({
    status: statusCode,
    error: {
      message: error.message,
    },
  });
};

export const notFoundHandler = (req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  
  next(error);
};
