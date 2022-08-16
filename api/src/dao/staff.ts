import { AppDataSource } from "../config/data-source";
import { Staff } from "../entitys";
import { ICreateStaff } from "../models/createRequest";
import { IQueryStaff } from "../models/queryRequest";
import departmentDAO from "./department";
import { Brackets } from "typeorm";
const staffReponsitory = AppDataSource.getRepository(Staff);

class StaffDAO {
  static findStaffByPhone = async (phone: string): Promise<Staff | null> => {
    const rs = await staffReponsitory.findOne({
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
    if (!rs) {
      return null;
    }
    return rs;
  };
  static findStaffById = async (id: string): Promise<Staff | null> => {
    const rs = await staffReponsitory.findOne({
      where: {
        id: id,
      },
      relations: {
        department: true,
      },
    });
    if (!rs) {
      return null;
    }
    return rs;
  };
  static create = async (staff: ICreateStaff): Promise<Staff | null> => {
    const department = await departmentDAO.findDepartmentById(
      staff.departmentId
    );
    if (!department) {
      return null;
    }
    const createStaff = await staffReponsitory.save(
      staffReponsitory.create({ ...staff, department: department })
    );
    return createStaff;
  };
  static saveStaff = async (
    staff: ICreateStaff,
    id: string
  ): Promise<Staff | null> => {
    const oldStaff = await this.findStaffById(id);
    const department = await departmentDAO.findDepartmentById(
      staff.departmentId
    );
    if (!oldStaff || !department) {
      return null;
    }
    const updateStaff = await staffReponsitory.save(
      Object.assign(oldStaff, { ...staff, department: department })
    );
    return updateStaff;
  };
  static changeActive = async (id: string): Promise<Staff | null> => {
    const oldStaff = await this.findStaffById(id);
    if (!oldStaff) {
      return null;
    }
    const updateStaff = await staffReponsitory.update(id, {
      active: !oldStaff.active,
    });
    if (!updateStaff.affected) {
      return null;
    }
    await oldStaff.reload();
    return oldStaff;
  };
  static findStaffs = async (query: IQueryStaff): Promise<Staff[]> => {
    const limit = query.limit ? Math.floor(query.limit) : 20;
    const keyword = query.keyword ? "%" + query.keyword + "%" : "%%";
    const skip = query.page > 0 ? Math.floor(query.page - 1) * limit : 0;
    const queryString = await staffReponsitory
      .createQueryBuilder()
      .innerJoinAndSelect("Staff.department", "Department")
      .where(
        new Brackets((qh) => {
          qh.where("Staff.name LIKE :name", { name: keyword }).orWhere(
            "Staff.phone LIKE :phone",
            { phone: keyword }
          );
        })
      );
    if (query.active) {
      await queryString.andWhere("Staff.active = :active", {
        active: query.active,
      });
    }
    if (query.departmentId) {
      await queryString.andWhere("Department.id = :id", {
        id: query.departmentId,
      });
    }
    return await queryString.limit(limit).offset(skip).getMany();
  };
}
export default StaffDAO;
