import services from "../services";
import { Request, Response } from "express";
import * as response from "../utils/response";
import { ICreateStaff } from "../models/createRequest";
import { IQueryStaff } from "../models/queryRequest";
import responseMsg from "../const/responseMsg";
export const create = async (req: Request, res: Response) => {
  const staff: ICreateStaff = req.body as ICreateStaff;
  const [data, error] = <[Object | null, Error | null]>(
    await services.staff.create(staff)
  );
  if (error) {
    if (error.message == responseMsg.ALREADY_EXIST) {
      return response.r409(res);
    }
    return response.r404(res);
  }
  return response.r200(res, data);
};
export const update = async (req: Request, res: Response) => {
  const staff: ICreateStaff = req.body as ICreateStaff;
  const [data, error] = <[Object | null, Error | null]>(
    await services.staff.update(req.params.id, staff)
  );
  if (error) {
    if (error.message == responseMsg.ALREADY_EXIST) {
      return response.r409(res);
    }
    return response.r404(res);
  }
  return response.r200(res, data);
};
export const changeActive = async (req: Request, res: Response) => {
  const [data, error] = await services.staff.changeActive(req.params.id);
  if (error) {
    return response.r404(res);
  }
  return response.r200(res, data);
};
export const findById = async (req: Request, res: Response) => {
  const [data, error] = await services.staff.findById(req.params.id);
  if (error) {
    return response.r404(res);
  }
  return response.r200(res, data);
};
export const find = async (req: Request, res: Response) => {
  const query: IQueryStaff = req.query as never;
  const [data, error] = await services.staff.find(query);
  return response.r200(res, data);
};
