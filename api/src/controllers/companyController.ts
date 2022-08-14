import { ICreateCompany, IQueryCompany } from "../models/models";
import CompanyService from "../services/companyService";
import { Request, Response, NextFunction } from "express";
import * as response from "../utils/response";
import commonService from "../services/commonService";
import responseMsg from "../const/responseMsg";

export default class companyController {
  static getCompanyById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const rs = await CompanyService.findCompanyById(req.params.id);
      if (!rs.data) {
        return response.r404(res, rs.message);
      }
      return response.r200(res, rs.data, rs.message);
    } catch (error) {
      next(error);
    }
  };
  static getCompanys = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const query: IQueryCompany = req.query as never;
      const rs = await CompanyService.findCompanys(query);
      if (!rs.data) {
        return response.r404(res, rs.message);
      }
      return response.r200(res, rs.data, rs.message);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
  static createCompany = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      if (!res.locals.auth || !res.locals.auth.isRoot) {
        return response.r401(res, responseMsg.DENIED_ACCESS);
      }
      const company: ICreateCompany = req.body as ICreateCompany;
      const rs = await CompanyService.createCompany(company);
      if (!rs.data) {
        return response.r400(res, rs.message);
      }
      return response.r200(res, rs.data, rs.message);
    } catch (error) {
      next(error);
    }
  };
  static changeActiveCompany = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      if (!res.locals.auth || !res.locals.auth.isRoot) {
        return response.r401(res, responseMsg.DENIED_ACCESS);
      }
      const rs = await CompanyService.changeActive(req.params.id);
      if (!rs.data) {
        return response.r404(res, rs.message);
      }
      return response.r200(res, rs.data, rs.message);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
  static updateCompany = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      if (!res.locals.auth || !res.locals.auth.isRoot) {
        return response.r401(res, responseMsg.DENIED_ACCESS);
      }
      const company: ICreateCompany = req.body as ICreateCompany;
      const rs = await CompanyService.updateCompany(company, req.params.id);
      if (!rs.data) {
        return response.r400(res, rs.message);
      }
      return response.r200(res, rs.data, rs.message);
    } catch (error) {
      next(error);
    }
  };
}
