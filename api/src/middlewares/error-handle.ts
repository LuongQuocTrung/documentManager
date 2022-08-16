import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import AppError from "../utils/appError";
import responseMsg from "../const/responseMsg";
const errorHandle = (
  error: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = error.statusCode || 500;
  let message = error.message ? error.message : "Server error";

  if (error.name == "TokenExpiredError" || error.name == "JsonWebTokenError") {
    statusCode = 401;
    message = responseMsg.REQUIRE_TOKEN;
  }
  if (String(statusCode).startsWith("5")) {
    console.log("Server crash");
    throw error;
  }
  res.status(statusCode).json({
    status: "Failure",
    message: message,
  });
};

export default errorHandle;
