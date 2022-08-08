import validate from "uuid-validate";
import {
  createDrawer,
  saveDrawer,
  getDrawer,
  getListDrawer,
} from "../services/DrawerService.js";
import { getCabinet } from "../services/CabinetService.js";

const drawerController = {
  create: async (req, res, next) => {
    try {
      const { name, active, cabinetId } = req.body;
      if (!validate(cabinetId)) {
        const error = new Error("Type of cabinetId is not uuid format ");
        error.statusCode = 403;
        return next(error);
      }
      const cabinet = await getCabinet(cabinetId);
      if (!cabinet) {
        const error = new Error("Cabinet not found");
        error.statusCode = 404;
        return next(error);
      }
      const rs = await createDrawer({ name, active }, cabinet);
      return res.status(200).json({ msg: "create successfully", data: rs });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  update: async (req, res, next) => {
    try {
      const drawer = await getDrawer(req.params.id);
      if (!drawer) {
        const error = new Error("Drawer not found");
        error.statusCode = 404;
        return next(error);
      }
      req.body.cabinet = await getCabinet(req.body.cabinetId);
      Object.assign(drawer, req.body);
      const updateCabinet = await saveDrawer(drawer);
      delete updateCabinet.cabinetId;
      return res
        .status(200)
        .json({ msg: "update successfully", data: updateCabinet });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  getDrawer: async (req, res, next) => {
    try {
      const rs = await getDrawer(req.params.id);
      return res.status(200).json({ msg: "get successfully", data: rs });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  getDrawers: async (req, res, next) => {
    try {
      const rs = await getListDrawer();

      res.status(200).json({ msg: "get successfully", data: rs });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  changeActiveDrawer: async (req, res, next) => {
    try {
      const drawer = await getDrawer(req.params.id);
      if (!drawer) {
        const error = new Error("Drawer not found");
        error.statusCode = 404;
        return next(error);
      }
      let active = req.body.active.toLowerCase();
      if (!(active == "true" || active == "false")) {
        const error = new Error("Invalid input");
        error.statusCode = 403;
        return next(error);
      }
      drawer.active = JSON.parse(active);
      const updateDrawer = await saveDrawer(drawer);
      return res.status(200).json({
        msg: "Change an active status successfully",
        data: updateDrawer,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
};
export default drawerController;
