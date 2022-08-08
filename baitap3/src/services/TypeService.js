import Type from "../models/Type.js";
import AppDataSource from "../config/configConnection.js";

const typeResponsitory = AppDataSource.getRepository(Type);

export const getType = async (typeId) => {
  return await typeResponsitory.findOneBy({ id: typeId });
};
export const getListType = async () => {
  return await typeResponsitory.find({});
};
