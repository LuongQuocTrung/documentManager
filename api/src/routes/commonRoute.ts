import * as express from "express";
import commonController from "../controllers/commonController";
import * as validate from "./validate/common";
import { auth } from "../middleware/auth";
const router = express.Router();

router.post("/login", validate.login, commonController.login);
router.get("/category", auth, commonController.getCategory);
router.get("/me", auth, commonController.getMe);
export default router;
