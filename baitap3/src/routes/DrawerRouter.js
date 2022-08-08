import express from "express";
import { auth, verifyIsRoot } from "../middleware/auth.js";
import drawerController from "../controllers/DrawerController.js";
import validate from "../middleware/validate.js";
const router = express.Router();
router.use(auth);
router.post("/", verifyIsRoot, validate.drawerRequest, drawerController.create);
router.put(
  "/:id",
  verifyIsRoot,
  validate.drawerRequest,
  drawerController.update
);
router.patch("/:id", verifyIsRoot, drawerController.changeActiveDrawer);
router.get("/:id", drawerController.getDrawer);
router.get("/", drawerController.getDrawers);
router.all("*", (req, res, next) => {
  return next();
});

export default router;
