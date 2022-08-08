import Department from "../models/Department.js";
import AppDataSource from "../config/configConnection.js";

const departmentReponsitory = AppDataSource.getRepository(Department);
export const createDepartment = async (department, company) => {
  return await departmentReponsitory.save(
    departmentReponsitory.create({ ...department, company })
  );
};
export const saveDepartment = async (department) => {
  return await departmentReponsitory.save(department);
};
export const getDepartmentById = async (departmentId) => {
  return await departmentReponsitory.findOne({
    where: {
      id: departmentId,
    },
    relations: {
      company: true,
    },
  });
};
export const deleteDepartment = async (departmentID) => {
  return await departmentReponsitory.delete({ id: departmentID });
};
export const getListDepartments = async () => {
  return await departmentReponsitory.find({
    relations: {
      company: true,
    },
  });
};
