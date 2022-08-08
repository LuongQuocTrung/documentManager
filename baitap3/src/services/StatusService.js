import Status from "../models/Status.js";
import AppDataSource from "../config/configConnection.js";

const statusReponsitory = AppDataSource.getRepository(Status);

export const getStatus = async (statusId) => {
  return await statusReponsitory.findOneBy({ id: statusId });
};
export const getListStatus = async () => {
  return await statusReponsitory.find({});
};
