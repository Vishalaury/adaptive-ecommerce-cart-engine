// const errorHandler = (err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({
//     error: 'Internal Server Error',
//     message: err.message
//   });
// };

// module.exports = errorHandler;


const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  const statusCode = err.statusCode || 500;

  return res.status(statusCode).json({
    error: err.name || "Internal Server Error",
    message: err.message || "Something went wrong",
  });
};

module.exports = errorHandler;