import { ILogin } from "../models/commonRequest";
import services from "../services";
import { Request, Response } from "express";
import * as response from "../utils/response";
export const login = async (req: Request, res: Response) => {
  const queryLogin: ILogin = req.body as ILogin;

  const [data, error] = <[Object | null, Error | null]>(
    await services.common.login(queryLogin)
  );
  if (error) {
    console.log(error);
    return response.r401(res, error.message);
  }
  return response.r200(res, data);
};
