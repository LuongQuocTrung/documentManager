import validate from "uuid-validate";
import {
  createDepartment,
  saveDepartment,
  getDepartmentById,
  getListDepartments,
} from "../services/DepartmentService.js";
import { getCompany } from "../services/CompanyService.js";

const departmentController = {
  create: async (req, res, next) => {
    try {
      const { name, active, companyId } = req.body;
      if (!validate(companyId)) {
        const error = new Error("Type of companyId is not uuid format ");
        error.statusCode = 403;
        return next(error);
      }
      const company = await getCompany(companyId);
      if (!company) {
        const error = new Error("Company not found");
        error.statusCode = 404;
        return next(error);
      }
      const rs = await createDepartment({ name, active }, company);
      return res.status(200).json({ msg: "create successfully", data: rs });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
  update: async (req, res, next) => {
    try {
      const department = await getDepartmentById(req.params.id);
      if (!department) {
        const error = new Error("Department not found");
        error.statusCode = 404;
        return next(error);
      }
      req.body.company = await getCompany(req.body.companyId);
      Object.assign(department, req.body);
      const updateDepartment = await saveDepartment(department);
      delete updateDepartment.companyId;
      return res
        .status(200)
        .json({ msg: "update successfully", data: updateDepartment });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
  changeActiveDepartment: async (req, res, next) => {
    try {
      const department = await getDepartmentById(req.params.id);
      if (!department) {
        const error = new Error("Department not found");
        error.statusCode = 404;
        return next(error);
      }
      let active = req.body.active.toLowerCase();
      if (!(active == "true" || active == "false")) {
        const error = new Error("Invalid input");
        error.statusCode = 403;
        return next(error);
      }
      department.active = JSON.parse(active);
      const updateDepartment = await saveDepartment(department);
      return res.status(200).json({
        msg: "Change an active status successfully",
        data: updateDepartment,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
  getDepartment: async (req, res, next) => {
    try {
      const rs = await getDepartmentById(req.params.id);
      return res.status(200).json({ msg: "get successfully", data: rs });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
  getDepartments: async (req, res, next) => {
    try {
      const rs = await getListDepartments();
      res.status(200).json({ msg: "get successfully", data: rs });
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
};
export default departmentController;
