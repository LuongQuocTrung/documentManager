import dao from "../dao";
import { ILogin } from "../models/commonRequest";
import { Staff } from "../entitys";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcryptjs";
import config from "../configs/config";
import responseMsg from "../const/responseMsg";

export const login = async (login: ILogin) => {
  const user = await dao.staff.findByPhone(login.phone);
  if (user instanceof Error) {
    return [null, user];
  }
  if (!user.isRoot) {
    if (!user.active) {
      return [null, new Error(responseMsg.ACCOUNT_IS_DISABLE)];
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
    return [{ phone: user.phone, name: user.name, token: accessToken }, null];
  }
  return [null, new Error(responseMsg.WRONG_PASSWORD)];
};
