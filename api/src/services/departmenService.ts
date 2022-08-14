import departmentDAO from "../DAO/departmentDAO";
import { ICreateDepartment, IQueryDepartment } from "../models/models";
import responseMsg from "../const/responseMsg";
export default class departmentService {
  static createDepartment = async (department: ICreateDepartment) => {
    const rs = await departmentDAO.createDepartment(department);
    if (!rs) {
      return { data: null, message: responseMsg.CREATE_ERROR };
    }
    return { data: rs, message: responseMsg.CREATE_SUCCESS };
  };
  static updateDepartment = async (
    department: ICreateDepartment,
    id: string
  ) => {
    const rs = await departmentDAO.saveDepartment(department, id);
    if (!rs) {
      return { data: null, message: responseMsg.UPDATE_ERROR };
    }
    return { data: rs, message: responseMsg.UPDATE_SUCCESS };
  };
  static findDepartmentByID = async (id: string) => {
    const rs = await departmentDAO.findDepartmentById(id);
    if (!rs) {
      return { data: null, message: responseMsg.NOT_FOUND };
    }
    return { data: rs, message: responseMsg.SUCCESS };
  };
  static findDepartments = async (query: IQueryDepartment) => {
    const rs = await departmentDAO.findDepartments(query);
    if (!rs) {
      return { data: null, message: responseMsg.NOT_FOUND };
    }
    return { data: rs, message: responseMsg.SUCCESS };
  };
  static changeActive = async (id: string) => {
    const rs = await departmentDAO.changeActive(id);
    if (!rs) {
      return { data: null, message: responseMsg.UPDATE_ERROR };
    }
    return { data: rs, message: responseMsg.UPDATE_SUCCESS };
  };
}
