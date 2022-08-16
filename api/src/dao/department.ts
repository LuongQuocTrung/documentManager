import { Department } from "../entitys";
import { AppDataSource } from "../config/data-source";
import { ICreateDepartment } from "../models/createRequest";
import CompanyDAO from "./company";
import { IQueryDepartment } from "../models/queryRequest";

const departmenReponsitory = AppDataSource.getRepository(Department);

export default class departmentDAO {
  static findDepartmentById = async (
    id: string
  ): Promise<Department | null> => {
    const rs = await departmenReponsitory.findOne({
      where: { id: id },
      relations: { company: true },
    });
    if (!rs) {
      return null;
    }
    return rs;
  };
  static findDepartments = async (
    query: IQueryDepartment
  ): Promise<Department[]> => {
    const limit = query.limit ? Math.floor(query.limit) : 20;
    const keyword = query.keyword ? "%" + query.keyword + "%" : "%%";
    const skip = query.page > 0 ? Math.floor(query.page - 1) * limit : 0;
    console.log(keyword);
    const queryString = await departmenReponsitory
      .createQueryBuilder()
      .innerJoinAndSelect("Department.company", "Company")
      .where("Department.name Like :name", { name: keyword });
    if (query.companyId && query.companyId != "all") {
      await queryString.andWhere("Company.id = :id", { id: query.companyId });
    }
    if (query.active) {
      await queryString.andWhere("Department.active = :active", {
        active: query.active,
      });
    }
    return await queryString.limit(limit).offset(skip).getMany();
  };
  static createDepartment = async (
    department: ICreateDepartment
  ): Promise<Department | null> => {
    const company = await CompanyDAO.findCompanyById(department.companyId);
    if (!company) {
      return null;
    }
    const createDepartment = await departmenReponsitory.save(
      departmenReponsitory.create({ ...department, company })
    );
    return createDepartment;
  };
  static saveDepartment = async (
    department: ICreateDepartment,
    id: string
  ): Promise<Department | null> => {
    const oldDepartment = await departmenReponsitory.findOneBy({ id });
    const company = await CompanyDAO.findCompanyById(department.companyId);
    if (!oldDepartment || !company) {
      return null;
    }
    const updateDepartment = await departmenReponsitory.save(
      Object.assign(oldDepartment, { ...department, company: company })
    );
    return updateDepartment;
  };
  static changeActive = async (id: string): Promise<Department | null> => {
    const oldDepartment = await this.findDepartmentById(id);
    if (!oldDepartment) {
      return null;
    }
    const updateDepartment = await departmenReponsitory.update(id, {
      active: !oldDepartment.active,
    });
    if (!updateDepartment.affected) {
      return null;
    }
    await oldDepartment.reload();
    return oldDepartment;
  };
}
