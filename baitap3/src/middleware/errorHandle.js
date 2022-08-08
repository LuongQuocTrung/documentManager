const errorHandle = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  if (err.name == "JsonWebTokenError" || err.name == "TokenExpiredError") {
    err.statusCode = 401;
    err.message = "Please log in to get new an access token";
  }
  if (err.code == 23505) {
    err.statusCode = 400;
    err.message = err.detail;
  }
  if (err.code == "22P02") {
    err.statusCode = 403;
    err.message = "INVALID TEXT REPRESENTATION, please check input again";
  }
  const typeMsg = String(err.statusCode).startsWith(4) ? "msg" : "error";
  const typeStatus = String(err.statusCode).startsWith(4) ? "fail" : "error";
  res.status(err.statusCode).json({
    status: typeStatus,
    [typeMsg]: err.message,
  });
};

export default errorHandle;
