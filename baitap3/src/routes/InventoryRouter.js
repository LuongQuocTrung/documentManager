import express from "express";
import { auth, verifyIsRoot } from "../middleware/auth.js";
import validate from "../middleware/validate.js";
import inventoryContoller from "../controllers/InventoryController.js";
const router = express.Router();
router.use(auth);
router.post(
  "/",
  verifyIsRoot,
  validate.inventoryRequest,
  inventoryContoller.create
);
router.get("/:id", inventoryContoller.getInventory);
router.put(
  "/:id",
  verifyIsRoot,
  validate.inventoryRequest,
  inventoryContoller.update
);
router.get("/", inventoryContoller.getInventories);
router.all("*", (req, res, next) => {
  return next();
});

export default router;
