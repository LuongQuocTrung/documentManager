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
export const createCompany = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await checkBody(["name", "active", "address"]).notEmpty().run(req);
  await checkBody(["name", "address"]).isString().run(req);
  await checkBody("active").isBoolean().run(req);
  const rs = validationResult(req);
  if (!rs.isEmpty()) {
    const error = new AppError(403, responseMsg.INVALID_INPUT);
    return next(error);
  }
  next();
};
export const queryCompany = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await checkQuery(["limit", "page"])
    .isNumeric()
    .optional({ nullable: true })
    .run(req);
  await checkQuery("keyword").isString().optional({ nullable: true }).run(req);
  await checkQuery("active").isBoolean().optional({ nullable: true }).run(req);
  const rs = validationResult(req);
  if (!rs.isEmpty()) {
    const error = new AppError(403, responseMsg.INVALID_INPUT);
    return next(error);
  }
  if (req.body.typeCompany) {
    if (
      req.body.typeCompany != "management" &&
      req.body.typeCompany != "storage"
    ) {
      const error = new AppError(403, responseMsg.INVALID_INPUT);
      return next(error);
    }
  }
  next();
};
