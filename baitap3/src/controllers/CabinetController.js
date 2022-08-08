import {
  createCabinet,
  getCabinet,
  getListCabinet,
  saveCabinet,
} from "../services/CabinetService.js";
import { getInventory } from "../services/InventoryService.js";
import validate from "uuid-validate";

const cabinetController = {
  create: async (req, res, next) => {
    try {
      const { name, inventoryId } = req.body;
      if (!validate(inventoryId)) {
        const error = new Error("Type of inventoryId is not uuid format ");
        error.statusCode = 403;
        return next(error);
      }
      const inventory = await getInventory(inventoryId);
      if (!inventory) {
        const error = new Error("Inventory not found");
        error.statusCode = 404;
        return next(error);
      }
      const rs = await createCabinet({ name }, inventory);
      return res.status(200).json({ msg: "create successfully", data: rs });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  update: async (req, res, next) => {
    try {
      const cabinet = await getCabinet(req.params.id);
      if (!cabinet) {
        const error = new Error("Cabinet not found");
        error.statusCode = 404;
        return next(error);
      }
      req.body.inventory = await getInventory(req.body.inventoryId);
      Object.assign(cabinet, req.body);
      const updateCabinet = await saveCabinet(cabinet);
      delete updateCabinet.inventoryId;
      return res
        .status(200)
        .json({ msg: "update successfully", data: updateCabinet });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  getCabinet: async (req, res, next) => {
    try {
      const rs = await getCabinet(req.params.id);
      return res.status(200).json({ msg: "get successfully", data: rs });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  getCabinets: async (req, res, next) => {
    try {
      const rs = await getListCabinet();
      res.status(200).json({ msg: "get successfully", data: rs });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
};

export default cabinetController;
