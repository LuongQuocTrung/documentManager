import CompanyDAO from "../dao/company";
import { Company } from "../entitys";
import { ICreateCompany } from "../models/createRequest";
import { IQueryCompany } from "../models/queryRequest";
import responseMsg from "../const/responseMsg";
export default class CompanyService {
  static createCompany = async (company: ICreateCompany) => {
    const rs = await CompanyDAO.createCompany(company);
    if (!rs) {
      return { data: null, message: responseMsg.CREATE_ERROR };
    }
    return { data: rs, message: responseMsg.CREATE_SUCCESS };
  };
  static updateCompany = async (company: ICreateCompany, id: string) => {
    const rs = await CompanyDAO.saveCompany(company, id);
    if (!rs) {
      return { data: null, message: responseMsg.UPDATE_ERROR };
    }
    return { data: rs, message: responseMsg.UPDATE_SUCCESS };
  };
  static findCompanyById = async (id: string) => {
    const rs = await CompanyDAO.findCompanyById(id);
    if (!rs) {
      return { data: null, message: responseMsg.NOT_FOUND };
    }
    return { data: rs, message: responseMsg.SUCCESS };
  };
  static findCompanies = async (query: IQueryCompany) => {
    if (query.typeCompany != "storage" && query.typeCompany != "management") {
      query.typeCompany = "all";
    }
    const rs = await CompanyDAO.findCompanys(query);
    if (!rs) {
      return { data: null, message: responseMsg.NOT_FOUND };
    }
    return { data: rs, message: responseMsg.SUCCESS };
  };
  static changeActive = async (id: string) => {
    const rs = await CompanyDAO.changeActive(id);
    if (!rs) {
      return { data: null, message: responseMsg.UPDATE_STATUS_ERROR };
    }
    return { data: rs, message: responseMsg.UPDATE_SUCCESS };
  };
}
