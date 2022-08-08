import express from "express";
import staffController from "../controllers/StaffController.js";
import { auth, verifyIsRoot } from "../middleware/auth.js";
const router = express.Router();
router.use(auth);
//localhost:5000/staff/:idqwe method = GET
router.get("/", verifyIsRoot, staffController.getStaffs);
router.all("*", (req, res, next) => {
  return next();
});
export default router;
