import { ICreateDrawer, IQueryDrawer } from "../models/models";
import drawerService from "../services/drawerService";
import { Request, Response, NextFunction } from "express";
import * as response from "../utils/response";
import responseMsg from "../const/responseMsg";
export default class drawerController {
  static getDrawerById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const rs = await drawerService.findDrawerById(req.params.id);
      if (!rs.data) {
        return response.r404(res, rs.message);
      }
      return response.r200(res, rs.data, rs.message);
    } catch (error) {
      next(error);
    }
  };
  static getDrawers = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const query: IQueryDrawer = req.query as never;
      const rs = await drawerService.findDrawers(query);
      if (!rs.data) {
        return response.r404(res, rs.message);
      }
      return response.r200(res, rs.data, rs.message);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
  static createDrawer = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      if (!res.locals.auth || !res.locals.auth.isRoot) {
        return response.r401(res, responseMsg.DENIED_ACCESS);
      }
      const drawer: ICreateDrawer = req.body as ICreateDrawer;
      const rs = await drawerService.createDrawer(drawer);
      if (!rs.data) {
        return response.r400(res, rs.message);
      }
      return response.r200(res, rs.data, rs.message);
    } catch (error) {
      next(error);
    }
  };
  static changeActiveDrawer = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const rs = await drawerService.changeActive(req.params.id);
      if (!rs.data) {
        return response.r404(res, rs.message);
      }
      return response.r200(res, rs.data, rs.message);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
  static updateDrawer = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      if (!res.locals.auth || !res.locals.auth.isRoot) {
        return response.r401(res, responseMsg.DENIED_ACCESS);
      }
      const drawer: ICreateDrawer = req.body as ICreateDrawer;
      const rs = await drawerService.updateDrawer(drawer, req.params.id);
      if (!rs.data) {
        return response.r400(res, rs.message);
      }
      return response.r200(res, rs.data, rs.message);
    } catch (error) {
      next(error);
    }
  };
}
