import { ICreateDepartment } from "../models/createRequest";
import { IQueryDepartment } from "../models/queryRequest";
import departmentService from "../services/departmenService";
import { Request, Response, NextFunction } from "express";
import * as response from "../utils/response";
import responseMsg from "../const/responseMsg";
export default class departmentController {
  static getDepartmentById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const rs = await departmentService.findDepartmentByID(req.params.id);
      if (!rs.data) {
        return response.r404(res, rs.message);
      }
      return response.r200(res, rs.data, rs.message);
    } catch (error) {
      next(error);
    }
  };
  static getDepartments = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const query: IQueryDepartment = req.query as never;
      const rs = await departmentService.findDepartments(query);
      if (!rs.data) {
        return response.r404(res, rs.message);
      }
      return response.r200(res, rs.data, rs.message);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
  static createDepartment = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      if (!res.locals.auth || !res.locals.auth.isRoot) {
        return response.r401(res, responseMsg.DENIED_ACCESS);
      }
      const department: ICreateDepartment = req.body as ICreateDepartment;
      const rs = await departmentService.createDepartment(department);
      if (!rs.data) {
        return response.r400(res, rs.message);
      }
      return response.r200(res, rs.data, rs.message);
    } catch (error) {
      next(error);
    }
  };
  static changeActiveDepartment = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      if (!res.locals.auth || !res.locals.auth.isRoot) {
        return response.r401(res, responseMsg.DENIED_ACCESS);
      }
      const rs = await departmentService.changeActive(req.params.id);
      if (!rs.data) {
        return response.r404(res, rs.message);
      }
      return response.r200(res, rs.data, rs.message);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
  static updateDepartment = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      if (!res.locals.auth || !res.locals.auth.isRoot) {
        return response.r401(res, responseMsg.DENIED_ACCESS);
      }
      const department: ICreateDepartment = req.body as ICreateDepartment;
      const rs = await departmentService.updateDepartment(
        department,
        req.params.id
      );
      if (!rs.data) {
        return response.r400(res, rs.message);
      }
      return response.r200(res, rs.data, rs.message);
    } catch (error) {
      next(error);
    }
  };
}
