// backend/middleware/errorHandler.js
const errorHandler = (err, req, res, next) => {
  console.log(`error middleware : error handler`);
  console.error(err.stack);
  res.status(500).json({
    message: "Something went wrong!",
    error: err.message,
  });
};

export default errorHandler;
