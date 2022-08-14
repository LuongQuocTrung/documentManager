import { NextFunction, Request, Response } from "express";
import { Staff } from "../entitys";
import { ILogin } from "../models/models";
import commonService from "../services/commonService";
import staffService from "../services/staffService";
import * as response from "../utils/response";
import { statusDoc } from "../utils/statusDoc";
import { typeCompany } from "../utils/typeCompany";
class commonController {
  static login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const login: ILogin = req.body as ILogin;
      const rs = await commonService.login(login);
      if (!rs.data) {
        return response.r400(res, rs.message);
      }
      return response.r200(res, rs.data, rs.message);
    } catch (error) {
      next(error);
    }
  };
  static getMe = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user: Staff = res.locals.auth as never;
      const rs = await commonService.getMe(user);
      if (!rs.data) {
        return response.r400(res, rs.message);
      }
      return response.r200(res, rs.data, rs.message);
    } catch (error) {
      next(error);
    }
  };
  static getCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      return response.r200(res, {
        DocumentStatus: statusDoc,
        CompanyType: typeCompany,
      });
    } catch (error) {
      next(error);
    }
  };
}
export default commonController;
