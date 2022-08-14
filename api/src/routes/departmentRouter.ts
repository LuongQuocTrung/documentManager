import * as express from "express";
import departmentController from "../controllers/departmentController";
import { auth } from "../middleware/auth";
import * as validate from "./validate/department";
const router = express.Router();
router.use(auth);
router.get("/", validate.queryDepartment, departmentController.getDepartments);
router.get("/:id", validate.isUUID, departmentController.getDepartmentById);
router.post(
  "/",
  validate.createDepartment,
  departmentController.createDepartment
);
router.put(
  "/:id",
  validate.isUUID,
  validate.createDepartment,
  departmentController.updateDepartment
);
router.patch(
  "/:id/active",
  validate.isUUID,
  departmentController.changeActiveDepartment
);

export default router;
