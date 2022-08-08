import validate from "uuid-validate";
import {
  createCompany,
  getCompany,
  saveCompany,
  getListCompany,
} from "../services/CompanyService.js";
import { getType } from "../services/TypeService.js";
const companyController = {
  create: async (req, res, next) => {
    try {
      const { name, address, typeId } = req.body;
      if (!validate(typeId)) {
        const error = new Error("Type of typeId is not uuid format ");
        error.statusCode = 403;
        return next(error);
      }
      const type = await getType(typeId);
      if (!type) {
        const error = new Error("Type not found");
        error.statusCode = 404;
        return next(error);
      }
      const rs = await createCompany({ name, address }, type);
      return res.status(200).json({ msg: "create successfully", data: rs });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  update: async (req, res, next) => {
    try {
      const company = await getCompany(req.params.id);
      if (!company) {
        const error = new Error("Company not found");
        error.statusCode = 404;
        return next(error);
      }
      req.body.type = await getType(req.body.typeId);
      Object.assign(company, req.body);
      const updateCompany = await saveCompany(company);
      delete updateCompany.typeId;
      return res
        .status(200)
        .json({ msg: "update successfully", data: updateCompany });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  delete: async (req, res, next) => {},
  getCompany: async (req, res, next) => {
    try {
      const companyid = req.params.id;
      const rs = await getCompany(companyid);
      return res.status(200).json({ msg: "get successfully", data: rs });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  getCompanys: async (req, res, next) => {
    try {
      const rs = await getListCompany();

      res.status(200).json({ msg: "get successfully", data: rs });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
};

export default companyController;
