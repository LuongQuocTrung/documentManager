import { Response } from "express";
import responseMsg from "../const/responseMsg";
export const r200 = (
  res: Response,
  data: any,
  message: string = responseMsg.SUCCESS
) => {
  return res.status(200).json({ message, data: data });
};
export const r404 = (
  res: Response,
  message: string = responseMsg.NOT_FOUND
) => {
  return res.status(404).json({ message });
};
export const r403 = (
  res: Response,
  message: string = responseMsg.INVALID_INPUT
) => {
  return res.status(403).json({ message });
};
export const r401 = (
  res: Response,
  message: string = responseMsg.AUTH_FAILED
) => {
  return res.status(401).json({ message });
};
export const r400 = (
  res: Response,
  message: string = responseMsg.BAD_REQUEST
) => {
  return res.status(401).json({ message });
};
