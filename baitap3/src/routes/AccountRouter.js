import express from "express";
import staffController from "../controllers/StaffController.js";
import { auth, verifyIsRoot } from "../middleware/auth.js";
const router = express.Router();

router.post("/login", staffController.login);
router.post("/register", auth, verifyIsRoot, staffController.register);
router.all("*", (req, res, next) => {
  return next();
});
export default router;
