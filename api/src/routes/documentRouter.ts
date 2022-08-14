import * as express from "express";
import documentController from "../controllers/documentController";
import { auth } from "../middleware/auth";
import * as validate from "./validate/document";
const router = express.Router();
router.use(auth);
router.get("/", validate.queryDocument, documentController.getDocuments);
router.get("/:id", validate.isUUID, documentController.getdocumentById);
router.post("/", validate.createDocument, documentController.createDocument);
router.put(
  "/:id",
  validate.isUUID,
  validate.createDocument,
  documentController.updateDocument
);
router.patch(
  "/:id/storage",
  validate.bodyAndParamsIsUUID,
  documentController.storageDelivery
);

export default router;
