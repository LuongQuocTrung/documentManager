import express from "express";
import { auth, verifyIsRoot } from "../middleware/auth.js";
import companyController from "../controllers/CompanyController.js";
import validate from "../middleware/validate.js";
const router = express.Router();
router.use(auth);
router.post("/", validate.companyRequest, companyController.create);
router.get("/:id", companyController.getCompany);
router.put(
  "/:id",
  verifyIsRoot,
  validate.companyRequest,
  companyController.update
);
router.get("/", verifyIsRoot, companyController.getCompanys);
router.all("*", (req, res, next) => {
  return next();
});

export default router;
