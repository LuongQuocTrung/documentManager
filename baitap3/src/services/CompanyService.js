import Company from "../models/Company.js";
import AppDataSource from "../config/configConnection.js";
const companyReponsitory = AppDataSource.getRepository(Company);

export const createCompany = async (company, type) => {
  return await companyReponsitory.save(
    companyReponsitory.create({ ...company, type })
  );
};
export const saveCompany = async (company) => {
  return await companyReponsitory.save(company);
};
export const getCompany = async (companyId) => {
  return await companyReponsitory.findOne({
    where: {
      id: companyId,
    },
    relations: {
      type: true,
    },
  });
};
export const deleteCompany = async (companyId) => {
  return await companyReponsitory.delete({ id: companyId });
};
export const getListCompany = async (limit, page) => {
  return await companyReponsitory.find({
    relations: {
      type: true,
    },
  });
};
