import staffDAO from "../DAO/staffDAO";
import { Department, Staff } from "../entitys";
import { ILogin } from "../models/models";
import * as jwt from "jsonwebtoken";
import departmentDAO from "../DAO/departmentDAO";
import * as bcrypt from "bcryptjs";
import config from "../config/config";
import responseMsg from "../const/responseMsg";
export default class commonService {
  static login = async (login: ILogin) => {
    const user: Staff | null = await staffDAO.findStaffByPhone(login.phone);
    if (!user) {
      return { data: null, message: responseMsg.NOT_FOUND };
    }
    const department: Department | null =
      await departmentDAO.findDepartmentById(user.department.id);
    if (!user.isRoot) {
      if (!user.active || !department?.active || !department?.company.active) {
        return { data: null, message: responseMsg.ACCOUNT_IS_DISABLE };
      }
    }
    if (await bcrypt.compare(login.password, user.password)) {
      const accessToken = jwt.sign(
        { ...user, password: null },
        config.jwtSecret,
        {
          expiresIn: "24h",
        }
      );
      return {
        data: { phone: user.phone, name: user.name, token: accessToken },
        message: responseMsg.SUCCESS,
      };
    }
    return { data: null, message: responseMsg.WRONG_INPUT };
  };
  static getMe = async (user: Staff) => {
    const reloadUser = await staffDAO.findStaffById(user.id);
    if (!reloadUser) {
      return { data: null, message: responseMsg.ALREADY_EXIST };
    }
    const accessToken = jwt.sign(
      { ...reloadUser, password: null },
      config.jwtSecret,
      {
        expiresIn: "24h",
      }
    );
    return {
      data: { user: reloadUser, token: accessToken },
      message: responseMsg.SUCCESS,
    };
  };
}
