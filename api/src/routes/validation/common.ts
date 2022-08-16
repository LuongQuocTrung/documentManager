import { Request, Response, NextFunction } from "express";
import { check, validationResult, buildCheckFunction } from "express-validator";
import AppError from "../../utils/appError";
import responseMsg from "../../const/responseMsg";
const checkUUIDParamsAndRequest = buildCheckFunction([
  "body",
  "query",
  "params",
]);
const checkQuery = buildCheckFunction(["query"]);
const checkBody = buildCheckFunction(["body"]);
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await checkBody(["phone", "password"]).notEmpty().isString().trim().run(req);
  const rs = validationResult(req);
  if (!rs.isEmpty()) {
    const error = new AppError(403, responseMsg.INVALID_INPUT);
    return next(error);
  }
  next();
};
