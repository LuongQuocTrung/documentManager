import {
  createInventory,
  getInventory,
  getListInventory,
  saveInventory,
} from "../services/InventoryService.js";
import validate from "uuid-validate";
import { getCompany } from "../services/CompanyService.js";
const inventoryContoller = {
  create: async (req, res, next) => {
    try {
      let { name, companyId } = req.body;
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
      const rs = await createInventory({ name }, company);
      return res.status(200).json({ msg: "create successfully", data: rs });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  update: async (req, res, next) => {
    try {
      const inventory = await getInventory(req.params.id);
      if (!inventory) {
        const error = new Error("Inventory not found");
        error.statusCode = 404;
        return next(error);
      }
      req.body.company = await getCompany(req.body.companyId);
      Object.assign(inventory, req.body);
      const updateIventory = await saveInventory(inventory);
      delete updateIventory.companyId;
      return res
        .status(200)
        .json({ msg: "update successfully", data: updateIventory });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  getInventory: async (req, res, next) => {
    try {
      const inventory = await getInventory(req.params.id);
      return res.status(200).json({ msg: "get successfully", data: inventory });
    } catch (error) {
      next(error);
    }
  },
  getInventories: async (req, res, next) => {
    try {
      const rs = await getListInventory();

      res.status(200).json({ msg: "get successfully", data: rs });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
};

export default inventoryContoller;
