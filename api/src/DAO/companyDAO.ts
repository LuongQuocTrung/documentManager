import { Company } from "../entitys";
import { AppDataSource } from "../data-source";
import { ICreateCompany, IQueryCompany } from "../models/models";
import { Brackets } from "typeorm";
const companyResponsitory = AppDataSource.getRepository(Company);
export default class CompanyDAO {
  static createCompany = async (
    company: ICreateCompany
  ): Promise<Company | null> => {
    return await companyResponsitory.save(
      companyResponsitory.create({ ...company, typeCompany: "management" })
    );
  };

  static saveCompany = async (
    company: ICreateCompany,
    id: string
  ): Promise<Company | null> => {
    const oldCompany = await this.findCompanyById(id);
    if (!oldCompany) {
      return null;
    } else {
      return await companyResponsitory.save(Object.assign(oldCompany, company));
    }
  };
  static changeActive = async (id: string): Promise<Company | null> => {
    const oldCompany = await this.findCompanyById(id);
    if (!oldCompany) {
      return null;
    }
    const updateCompany = await companyResponsitory.update(id, {
      active: !oldCompany.active,
    });
    if (!updateCompany.affected) {
      return null;
    }
    await oldCompany.reload();
    return oldCompany;
  };
  static findCompanyById = async (id: string): Promise<Company | null> => {
    const rs = await companyResponsitory.findOneBy({ id });
    if (!rs) {
      return null;
    }
    return rs;
  };
  static findCompanys = async (query: IQueryCompany): Promise<Company[]> => {
    const limit = query.limit ? Math.floor(query.limit) : 20;
    const keyword = query.keyword ? "%" + query.keyword + "%" : "%%";
    const skip = query.page > 0 ? Math.floor(query.page - 1) * limit : 0;
    const queryString = await companyResponsitory
      .createQueryBuilder("Company")
      .where(
        new Brackets((qh) => {
          qh.where("Company.name LIKE :name", {
            name: keyword,
          }).orWhere("Company.address LIKE :address", {
            address: keyword,
          });
        })
      );
    if (query.active) {
      await queryString.andWhere("Company.active = :active", {
        active: query.active,
      });
    }
    if (query.typeCompany != "all") {
      await queryString.andWhere("Company.typeCompany = :type", {
        type: query.typeCompany,
      });
    }
    return await queryString.limit(limit).offset(skip).getMany();
  };
}
