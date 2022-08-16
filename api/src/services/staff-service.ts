import responseMsg from "../const/responseMsg";
import { ICreateStaff } from "../models/createRequest";
import { IQueryStaff } from "../models/queryRequest";
import dao from "../dao";
import { Staff } from "../entitys";
import { NullLiteral } from "typescript";

export const create = async (staff: ICreateStaff) => {
  if (await isPhoneExist(staff.phone, null)) {
    return [null, new Error(responseMsg.ALREADY_EXIST)];
  }
  const rs = await dao.staff.create(staff);
  if (rs instanceof Error) {
    return [null, rs];
  }

  return [{ ...rs, password: undefined }, null];
};
export const update = async (id: string, staff: ICreateStaff) => {
  if (await isPhoneExist(staff.phone, id)) {
    return [null, new Error(responseMsg.ALREADY_EXIST)];
  }
  if (!(await isExist(id))) {
    return [null, new Error(responseMsg.NOT_FOUND)];
  }
  const oldStaff = await dao.staff.findById(id);
  if (oldStaff instanceof Error) {
    return [null, oldStaff];
  }
  const rs = await dao.staff.update(
    Object.assign(oldStaff, { ...staff, auth: undefined })
  );
  if (rs instanceof Error) {
    return [null, rs];
  }

  return [rs, null];
};
export const changeActive = async (id: string) => {
  const staff = await dao.staff.findById(id);
  if (staff instanceof Error) {
    return [null, staff];
  }
  const rs = await dao.staff.changeActive(id, !staff.active);
  if (rs instanceof Error) {
    return [null, rs];
  }
  return [{}, null];
};
export const findById = async (id: string) => {
  const rs = await dao.staff.findById(id);
  if (rs instanceof Error) {
    return [null, rs];
  }
  return [rs, null];
};
export const find = async (query: IQueryStaff) => {
  query.limit = query.limit ? Math.floor(query.limit) : 20;
  query.keyword = query.keyword ? "%" + query.keyword + "%" : "%%";
  const rs = await dao.staff.find(query);
  return [rs, null];
};
export const isPhoneExist = async (phone: string, id: string | null) => {
  const rs = await dao.staff.findByPhone(phone);
  if (rs instanceof Error) {
    return false;
  }
  // trường hợp update kiểm tra xem phải số của bản thân
  if (id) {
    if (rs.id == id) {
      return false;
    }
    return true;
  }
  return true;
};
export const isExist = async (id: string) => {
  const rs = await dao.staff.findById(id);
  if (rs instanceof Error) {
    return false;
  }
  return true;
};
