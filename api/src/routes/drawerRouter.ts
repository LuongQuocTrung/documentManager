import * as express from "express";
import drawerController from "../controllers/drawerController";
import { auth } from "../middleware/auth";
import * as validate from "./validate/drawer";
const router = express.Router();
router.use(auth);
router.get("/", validate.queryDrawer, drawerController.getDrawers);
router.get("/:id", validate.isUUID, drawerController.getDrawerById);
router.post("/", validate.createDrawer, drawerController.createDrawer);
router.put(
  "/:id",
  validate.isUUID,
  validate.createDrawer,
  drawerController.updateDrawer
);
router.patch(
  "/:id/active",
  validate.isUUID,
  drawerController.changeActiveDrawer
);

export default router;
