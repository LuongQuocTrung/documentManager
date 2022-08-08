import express from "express";
import { auth, verifyIsRoot } from "../middleware/auth.js";
import cabinetController from "../controllers/CabinetController.js";
import validate from "../middleware/validate.js";
const router = express.Router();
router.use(auth);
router.post("/", validate.cabinetRequest, cabinetController.create);
router.get("/:id", cabinetController.getCabinet);
router.put(
  "/:id",
  verifyIsRoot,
  validate.cabinetRequest,
  cabinetController.update
);
router.get("/", cabinetController.getCabinets);
router.all("*", (req, res, next) => {
  return next();
});

export default router;
