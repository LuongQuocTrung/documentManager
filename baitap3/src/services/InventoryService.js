import Inventory from "../models/Inventory.js";
import AppDataSource from "../config/configConnection.js";

const inventoryResponsitory = AppDataSource.getRepository(Inventory);

export const createInventory = async (inventory, company) => {
  return await inventoryResponsitory.save(
    inventoryResponsitory.create({ ...inventory, company })
  );
};
export const saveInventory = async (inventory) => {
  return await inventoryResponsitory.save(inventory);
};
export const getInventory = async (inventoryId) => {
  return await inventoryResponsitory.findOne({
    where: {
      id: inventoryId,
    },
    relations: {
      company: true,
    },
  });
};
export const deleteInventory = async (inventoryId) => {
  return await inventoryResponsitory.delete({ id: inventoryId });
};
export const getListInventory = async () => {
  return await inventoryResponsitory.find({
    relations: {
      company: true,
    },
  });
};
