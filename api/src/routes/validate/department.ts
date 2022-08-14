import { Request, Response, NextFunction } from "express";
import { check, validationResult, buildCheckFunction } from "express-validator";
import responseMsg from "../../const/responseMsg";
import AppError from "../../utils/appError";
const checkUUIDParamsAndRequest = buildCheckFunction([
  "body",
  "query",
  "params",
]);
const checkQuery = buildCheckFunction(["query"]);
const checkBody = buildCheckFunction(["body"]);
export const isUUID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await checkUUIDParamsAndRequest("id").isUUID().run(req);
  const rs = validationResult(req);
  if (!rs.isEmpty()) {
    const error = new AppError(403, responseMsg.INVALID_INPUT);
    return next(error);
  }
  next();
};
export const createDepartment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await checkBody(["name", "active", "companyId"]).notEmpty().run(req);
  await checkBody("name").isString().run(req);
  await checkBody("companyId").isUUID().run(req);
  await checkBody("active").isBoolean().run(req);
  const rs = validationResult(req);
  if (!rs.isEmpty()) {
    const error = new AppError(403, responseMsg.INVALID_INPUT);
    return next(error);
  }
  next();
};
export const queryDepartment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await checkQuery(["limit", "page"])
    .isNumeric()
    .optional({ nullable: true })
    .run(req);
  await checkQuery("keyword").isString().optional({ nullable: true }).run(req);
  await checkQuery("companyId").isUUID().optional({ nullable: true }).run(req);
  await checkQuery("active").isBoolean().optional({ nullable: true }).run(req);
  const rs = validationResult(req);
  if (!rs.isEmpty()) {
    const error = new AppError(403, responseMsg.INVALID_INPUT);
    return next(error);
  }
  next();
};
