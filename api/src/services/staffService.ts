import responseMsg from "../const/responseMsg";
import StaffDAO from "../DAO/staffDAO";
import { ICreateStaff, IQueryStaff } from "../models/models";

export default class staffService {
  static createStaff = async (staff: ICreateStaff) => {
    const oldStaff = await StaffDAO.findStaffByPhone(staff.phone);
    if (oldStaff) {
      return { data: null, message: responseMsg.ALREADY_EXIST };
    }
    const rs = await StaffDAO.create(staff);
    if (!rs) {
      return { data: null, message: responseMsg.CREATE_ERROR };
    }
    return { data: rs, message: responseMsg.CREATE_SUCCESS };
  };
  static updateStaff = async (staff: ICreateStaff, id: string) => {
    const rs = await StaffDAO.saveStaff(staff, id);
    if (!rs) {
      return { data: null, message: responseMsg.UPDATE_ERROR };
    }
    return { data: rs, message: responseMsg.UPDATE_SUCCESS };
  };
  static changeActiveStaff = async (id: string) => {
    const rs = await StaffDAO.changeActive(id);
    if (!rs) {
      return {
        data: null,
        message: responseMsg.UPDATE_STATUS_ERROR,
      };
    }
    return {
      data: rs,
      message: responseMsg.UPDATE_SUCCESS,
    };
  };
  static findStaffById = async (id: string) => {
    const rs = await StaffDAO.findStaffById(id);
    if (!rs) {
      return { data: null, message: responseMsg.NOT_FOUND };
    }
    return { data: rs, message: responseMsg.SUCCESS };
  };
  static findStaffs = async (query: IQueryStaff) => {
    const rs = await StaffDAO.findStaffs(query);
    if (!rs) {
      return { data: null, message: responseMsg.NOT_FOUND };
    }
    return { data: rs, message: responseMsg.SUCCESS };
  };
}
