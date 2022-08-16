import db from "../configs/data-source";
import { ICreateStaff } from "../models/createRequest";
import { Staff } from "../entitys";
import { IQueryStaff } from "../models/queryRequest";
import { Brackets } from "typeorm";
import responseMsg from "../const/responseMsg";

export const findByPhone = async (phone: string): Promise<Staff | Error> => {
  const rs = await db
    .getStaffRepository()
    .createQueryBuilder("Staff")
    .where("Staff.phone = :phone", { phone })
    .select(["Staff", "Staff.password"])
    .getOne();
  if (!rs) {
    return new Error(responseMsg.NOT_FOUND);
  }
  return rs;
};
export const findById = async (id: string): Promise<Staff | Error> => {
  const rs = await db
    .getStaffRepository()
    .createQueryBuilder("Staff")
    .where("Staff.id = :id", { id })
    .getOne();
  if (!rs) {
    return new Error(responseMsg.NOT_FOUND);
  }
  return rs;
};
export const create = async (staff: ICreateStaff): Promise<Staff | Error> => {
  const newStaff = await db
    .getStaffRepository()
    .save(db.getStaffRepository().create(staff));
  if (!newStaff) {
    return new Error(responseMsg.CREATE_ERROR);
  }
  return newStaff;
};
export const update = async (staff: Staff): Promise<Staff | Error> => {
  const updateStaff = await db.getStaffRepository().save(staff);
  if (!updateStaff) {
    return new Error(responseMsg.UPDATE_ERROR);
  }
  return updateStaff;
};
export const changeActive = async (
  id: string,
  active: boolean
): Promise<Object | Error> => {
  const updateStatus = await db.getStaffRepository().update(id, {
    active,
  });
  if (!updateStatus.affected) {
    return new Error(responseMsg.UPDATE_STATUS_ERROR);
  }
  return {};
};
export const find = async (query: IQueryStaff): Promise<Staff[]> => {
  const skip = query.page > 0 ? Math.floor(query.page - 1) * query.limit : 0;
  const queryString = await db.getStaffRepository().createQueryBuilder();

  if (query.keyword) {
    queryString.andWhere(
      new Brackets((qh) => {
        qh.where("Staff.name LIKE :name", { name: query.keyword }).orWhere(
          "Staff.phone LIKE :phone",
          { phone: query.keyword }
        );
      })
    );
  }
  if (query.active) {
    await queryString.andWhere("Staff.active = :active", {
      active: query.active,
    });
  }
  return await queryString.limit(query.limit).offset(skip).getMany();
};
