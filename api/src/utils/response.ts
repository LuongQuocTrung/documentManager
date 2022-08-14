import { Response } from "express";

export const r200 = (
  res: Response,
  data: any,
  message: string = "Thành công"
) => {
  return res.status(200).json({ message, data: data });
};
export const r404 = (
  res: Response,
  message: string = "Không tìm thấy dữ liệu"
) => {
  return res.status(404).json({ message });
};
export const r403 = (
  res: Response,
  message: string = "Dữ liệu đầu vào không hợp lệ"
) => {
  return res.status(403).json({ message });
};
export const r401 = (
  res: Response,
  message: string = "Xác thực tài khoản bị từ chối"
) => {
  return res.status(401).json({ message });
};
export const r400 = (res: Response, message: string = "Yêu cầu bị từ chối") => {
  return res.status(401).json({ message });
};
