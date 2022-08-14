import * as express from "express";
import companyController from "../controllers/companyController";
import { auth } from "../middleware/auth";
import * as validate from "./validate/company";
const router = express.Router();
router.use(auth);
router.get("/", validate.queryCompany, companyController.getCompanys);
router.get("/:id", validate.isUUID, companyController.getCompanyById);
router.post("/", validate.createCompany, companyController.createCompany);
router.put(
  "/:id",
  validate.isUUID,
  validate.createCompany,
  companyController.updateCompany
);
router.patch(
  "/:id/active",
  validate.isUUID,
  companyController.changeActiveCompany
);

export default router;
