import {
  getStaffByPhone,
  getStaff,
  getListStaff,
  createStaff,
  saveStaff,
} from "../services/StaffService.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const staffController = {
  login: async (req, res, next) => {
    try {
      const { phone, password } = req.body;
      console.log(phone, password);
      const staff = await getStaffByPhone(phone);
      console.log(staff);
      if (!staff) {
        const error = new Error("Account not exists");
        error.statusCode = 404;
        return next(error);
      }
      if (await bcrypt.compare(password, staff.password)) {
        const accessToken = jwt.sign(
          { ...staff, password: null },
          process.env.ACCESS_TOKEN,
          {
            expiresIn: "1h",
          }
        );
        return res.status(200).json({
          token: accessToken,
          name: staff.name,
          phone: staff.phone,
        });
      } else {
        const error = new Error("Incorrect password");
        error.statusCode = 403;
        return next(error);
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  register: async (req, res, next) => {
    try {
      const { name, phone, password, isRoot, active } = req.body;
      const userExist = await staffResponsitory.findOneBy({ phone: phone });
      if (userExist) {
        const error = new Error("Account already exists");
        error.statusCode = 409;
        return next(error);
      }
      const hashPw = await bcrypt.hash(password, 10);
      const newStaff = await staffResponsitory.create({
        name: name,
        phone: phone,
        password: hashPw,
        isRoot: isRoot,
        active: active,
      });
      await staffResponsitory.save(newStaff);

      res.status(200).json("Register success");
    } catch (error) {
      next(error);
    }
  },
  getStaffs: async (req, res, next) => {
    try {
      const staffs = await staffResponsitory.find({});
      return res.status(200).json(staffs);
    } catch (error) {
      next(error);
    }
  },
};
export default staffController;
