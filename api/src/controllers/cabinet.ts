import cabinetService from "../services/cabinetService";
import { ICreateCabinet } from "../models/createRequest";
import { IQueryCabinet } from "../models/queryRequest";
import { Request, Response, NextFunction } from "express";
import * as response from "../utils/response";
export default class cabinetController {
  static getCabinets = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const query: IQueryCabinet = req.query as never;
      const rs = await cabinetService.findCabinets(query);
      if (!rs.data) {
        return response.r404(res, rs.message);
      }
      return response.r200(res, rs.data, rs.message);
    } catch (error) {
      next(error);
    }
  };
}
