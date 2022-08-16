import { NextFunction, Request, Response } from "express";
import * as response from "../utils/response";
import config from "../configs/config";
import * as jwt from "jsonwebtoken";
import { Staff } from "../entitys";
import services from "../services";
import responseMsg from "../const/responseMsg";
export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const token = <string>req.headers["authorization"]?.split("Bearer ")[1];

  if (!token) {
    return response.r401(res, responseMsg.REQUIRE_TOKEN);
  }
  try {
    const decoded = <Staff>await jwt.verify(token, config.jwtSecret);
    const [user, error] = <[Staff, Error]>(
      await services.staff.findById(decoded.id)
    );
    if (error) {
      return response.r401(res, responseMsg.NOT_EXIST);
    }
    if (!user.isRoot && !user.active) {
      return response.r401(res, responseMsg.ACCOUNT_IS_DISABLE);
    }
    req.body.auth = user;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};
