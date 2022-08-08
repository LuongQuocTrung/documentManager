import Staff from "../models/Staff.js";
import AppDataSource from "../config/configConnection.js";

const staffResponsitory = AppDataSource.getRepository(Staff);

export const getStaffByPhone = async (phone) => {
  return await staffResponsitory.findOne({
    where: {
      phone: phone,
    },
    select: {
      id: true,
      name: true,
      phone: true,
      password: true,
      isRoot: true,
      active: true,
    },
    relations: {
      department: true,
    },
  });
};
export const getStaff = async (staffId) => {
  return await staffResponsitory.findOne({
    where: {
      id: staffId,
    },
    relations: {
      department: true,
    },
  });
};
export const getListStaff = async () => {
  return await staffResponsitory.findOne({
    relations: {
      department: true,
    },
  });
};
export const createStaff = async (staff, department) => {
  return await staffResponsitory.save(
    staffResponsitory.create({ ...staff, department })
  );
};
export const saveStaff = async (staff) => {
  return await staffResponsitory.save(staff);
};
export const deleteStaff = async (staffId) => {
  return await staffResponsitory.delete({ id: staffId });
};
