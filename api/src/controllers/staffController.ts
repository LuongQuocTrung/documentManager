import staffService from "../services/staffService";
import { Request, Response, NextFunction } from "express";
import * as response from "../utils/response";
import { ICreateStaff, IQueryStaff } from "../models/models";
import responseMsg from "../const/responseMsg";
export default class staffController {
  static getStaffById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const rs = await staffService.findStaffById(req.params.id);
      if (!rs.data) {
        return response.r404(res, rs.message);
      }
      return response.r200(res, rs.data, rs.message);
    } catch (error) {
      next(error);
    }
  };
  static getStaffs = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const query: IQueryStaff = req.query as never;
      const rs = await staffService.findStaffs(query);
      if (!rs.data) {
        return response.r404(res, rs.message);
      }
      return response.r200(res, rs.data, rs.message);
    } catch (error) {
      next(error);
    }
  };
  static createStaff = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      if (!res.locals.auth || !res.locals.auth.isRoot) {
        return response.r401(res, responseMsg.DENIED_ACCESS);
      }
      const staff: ICreateStaff = req.body as ICreateStaff;
      const rs = await staffService.createStaff(staff);
      if (!rs.data) {
        return response.r400(res, rs.message);
      }
      return response.r200(res, rs.data, rs.message);
    } catch (error) {
      next(error);
    }
  };
  static changeActiveStaff = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      if (!res.locals.auth || !res.locals.auth.isRoot) {
        return response.r401(res, responseMsg.DENIED_ACCESS);
      }
      const rs = await staffService.changeActiveStaff(req.params.id);
      if (!rs.data) {
        return response.r404(res, rs.message);
      }
      return response.r200(res, rs.data, rs.message);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
  static updateStaff = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      if (!res.locals.auth || !res.locals.auth.isRoot) {
        return response.r401(res, responseMsg.DENIED_ACCESS);
      }
      const staff: ICreateStaff = req.body as ICreateStaff;
      const rs = await staffService.updateStaff(staff, req.params.id);
      if (!rs.data) {
        return response.r400(res, rs.message);
      }
      return response.r200(res, rs.data, rs.message);
    } catch (error) {
      next(error);
    }
  };
}
