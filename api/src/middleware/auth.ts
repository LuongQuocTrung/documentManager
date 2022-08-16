import { NextFunction, Request, Response } from "express";
import * as response from "../utils/response";
import config from "../config/config";
import * as jwt from "jsonwebtoken";
import staffService from "../services/staffService";
import departmentService from "../services/departmenService";
import { Department, Staff } from "../entitys";
import responseMsg from "../const/responseMsg";
export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const token: string | any = req.headers["authorization"]?.split("Bearer ")[1];

  if (!token) {
    return response.r401(res, responseMsg.REQUIRE_TOKEN);
  }
  try {
    const decoded = <Staff>await jwt.verify(token, config.jwtSecret);
    const user = (await staffService.findStaffById(decoded.id)).data;
    if (!user) {
      return response.r401(res, responseMsg.NOT_EXIST);
    }
    const department = <Department>(
      await (
        await departmentService.findDepartmentByID(user.department.id)
      ).data
    );
    if (!user.isRoot) {
      if (!user.active || !department.active || !department.company.active) {
        return response.r401(res, responseMsg.ACCOUNT_IS_DISABLE);
      }
    }
    res.locals.auth = user;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};
