import * as express from "express";
import staffController from "../controllers/staffController";
import { auth } from "../middleware/auth";
import * as validate from "./validate/staff";
const router = express.Router();
router.use(auth);
router.get("/", validate.queryStaff, staffController.getStaffs);
router.get("/:id", validate.isUUID, staffController.getStaffById);
router.post("/", validate.createStaff, staffController.createStaff);
router.put(
  "/:id",
  validate.isUUID,
  validate.createStaff,
  staffController.updateStaff
);
router.patch("/:id/active", validate.isUUID, staffController.changeActiveStaff);

export default router;
