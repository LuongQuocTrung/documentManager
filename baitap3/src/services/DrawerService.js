import Drawer from "../models/Drawer.js";
import AppDataSource from "../config/configConnection.js";

const drawerResponsitory = AppDataSource.getRepository(Drawer);

export const createDrawer = async (drawer, cabinet) => {
  return await drawerResponsitory.save(
    drawerResponsitory.create({ ...drawer, cabinet })
  );
};
export const saveDrawer = async (drawer) => {
  return await drawerResponsitory.save(drawer);
};
export const getDrawer = async (drawerId) => {
  return await drawerResponsitory.findOne({
    where: {
      id: drawerId,
    },
    relations: {
      cabinet: true,
    },
  });
};
export const deleteDrawer = async (drawerId) => {
  return await drawerResponsitory.delete({ id: drawerId });
};
export const getListDrawer = async () => {
  return await drawerResponsitory.find({
    relations: {
      cabinet: true,
    },
  });
};
