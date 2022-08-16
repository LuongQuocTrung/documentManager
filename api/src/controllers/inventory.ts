import { IQueryInventory } from "../models/queryRequest";
import { IcreateIventory } from "../models/createRequest";
import inventoryService from "../services/inventoryService";
import { Request, Response, NextFunction } from "express";
import * as response from "../utils/response";
export default class cabinetController {
  static getInventories = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const query: IQueryInventory = req.query as never;
      const rs = await inventoryService.findInventories(query);
      if (!rs.data) {
        return response.r404(res, rs.message);
      }
      return response.r200(res, rs.data, rs.message);
    } catch (error) {
      next(error);
    }
  };
}
