import Cabinet from "../models/Cabinet.js";
import AppDataSource from "../config/configConnection.js";

const cabinetRepository = AppDataSource.getRepository(Cabinet);

export const createCabinet = async (cabinet, inventory) => {
  return await cabinetRepository.save(
    cabinetRepository.create({ ...cabinet, inventory })
  );
};
export const saveCabinet = async (cabinet) => {
  return await cabinetRepository.save(cabinet);
};
export const getCabinet = async (cabinetId) => {
  return await cabinetRepository.findOne({
    where: {
      id: cabinetId,
    },
    relations: {
      inventory: true,
    },
  });
};
export const getListCabinet = async () => {
  return await cabinetRepository.find({
    relations: {
      inventory: true,
    },
  });
};
export const deleteCabinet = async (cabinetId) => {
  return await cabinetRepository.delete({ id: cabinetId });
};
