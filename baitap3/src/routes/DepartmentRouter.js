import express from "express";
import { auth, verifyIsRoot } from "../middleware/auth.js";
import departmentController from "../controllers/DepartmentController.js";
import validate from "../middleware/validate.js";
const router = express.Router();
router.use(auth);
router.post("/", validate.departmentRequest, departmentController.create);
router.put(
  "/:id",
  verifyIsRoot,
  validate.departmentRequest,
  departmentController.update
);
router.patch("/:id", verifyIsRoot, departmentController.changeActiveDepartment);
router.get("/:id", departmentController.getDepartment);
router.get("/", verifyIsRoot, departmentController.getDepartments);
router.all("*", (req, res, next) => {
  return next();
});
export default router;
