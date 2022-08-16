import * as express from "express";
import documentController from "../controllers/document";
import { auth } from "../middleware/auth";
import * as validate from "./validate/document";
const router = express.Router();
router.use(auth);
/**
 * @openapi
 * tags:
 *  name: Document
 */
router.get("/", validate.queryDocument, documentController.getDocuments);
/**
 * @openapi
 * /document:
 *   get:
 *     summary: Get documents
 *     tags: [Document]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *       - in: query
 *         name: drawerId
 *         schema:
 *           type: string
 *       - in: query
 *         name: status
 *         description: available value (waiting, stored)
 *         schema:
 *            type: string
 *       - in: query
 *         name: createdAt
 *         description: date format (yyyy-mm-dd)
 *         schema:
 *            type: date
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                    type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       title:
 *                         type: string
 *                       desciption:
 *                         type: string
 *                       status:
 *                         type: string
 *                       createdAt:
 *                         type: date
 *                       updatedAt:
 *                         type: date
 *                       drawer:
 *                         type: object
 *                         properties:
 *                            id:
 *                               type: string
 *                            name:
 *                               type: string
 *                            active:
 *                                type: boolean
 *                       staff:
 *                        type: object
 *                        properties:
 *                          id:
 *                            type: string
 *                          name:
 *                            type: string
 *                          phone:
 *                            type: string
 *                          iRoot:
 *                            type: boolean
 *                          active:
 *                            type: boolean
 */
router.get("/:id", validate.isUUID, documentController.getdocumentById);
/**
 * @openapi
 * /document/{id}:
 *   get:
 *     summary: Get document
 *     tags: [Document]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                    type: string
 *                 data:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       phone:
 *                         type: string
 *                       isRoot:
 *                         type: boolean
 *                       active:
 *                         type: boolean
 *                       staff:
 *                         type: object
 *                         properties:
 *                            id:
 *                               type: string
 *                            name:
 *                               type: string
 *                            phone:
 *                               type: string
 *                            isRoot:
 *                               type: string
 *                            active:
 *                                type: boolean
 *                       drawer:
 *                          type: object
 *                          properties:
 *                            id:
 *                              type: string
 *                            name:
 *                              type: string
 *                            active:
 *                              type: string
 */
router.post("/", validate.createDocument, documentController.createDocument);
/**
 * @openapi
 * /document:
 *   post:
 *     summary: create document
 *     tags: [Document]
 *     security:
 *      - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               drawerId:
 *                 type: string
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                    type: string
 *                 data:
 *                    type: object
 *                    properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       phone:
 *                         type: string
 *                       isRoot:
 *                         type: boolean
 *                       active:
 *                         type: boolean
 *                       createdAt:
 *                         type: date
 *                       updatedAt:
 *                          type: date
 *                       staff:
 *                         type: object
 *                         properties:
 *                            id:
 *                               type: string
 *                            name:
 *                               type: string
 *                            phone:
 *                               type: string
 *                            isRoot:
 *                               type: string
 *                            active:
 *                                type: boolean
 *                       drawer:
 *                          type: object
 *                          properties:
 *                            id:
 *                              type: string
 *                            name:
 *                              type: string
 *                            active:
 *                              type: boolean
 */
router.put(
  "/:id",
  validate.isUUID,
  validate.createDocument,
  documentController.updateDocument
);
/**
 * @openapi
 * /document/{id}:
 *   put:
 *     summary: update document
 *     tags: [Document]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               drawerId:
 *                 type: string
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                    type: string
 *                 data:
 *                    type: object
 *                    properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       phone:
 *                         type: string
 *                       isRoot:
 *                         type: boolean
 *                       active:
 *                         type: boolean
 *                       createdAt:
 *                         type: date
 *                       updatedAt:
 *                          type: date
 *                       staff:
 *                         type: object
 *                         properties:
 *                            id:
 *                               type: string
 *                            name:
 *                               type: string
 *                            phone:
 *                               type: string
 *                            isRoot:
 *                               type: string
 *                            active:
 *                                type: boolean
 *                       drawer:
 *                          type: object
 *                          properties:
 *                            id:
 *                              type: string
 *                            name:
 *                              type: string
 *                            active:
 *                              type: boolean
 */
router.patch(
  "/:id/storage",
  validate.bodyAndParamsIsUUID,
  documentController.storageDelivery
);
/**
 * @openapi
 * /document/{id}:
 *   patch:
 *     summary: update document
 *     tags: [Document]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               drawerId:
 *                 type: string
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                    type: string
 *                 data:
 *                    type: object
 *                    properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       phone:
 *                         type: string
 *                       isRoot:
 *                         type: boolean
 *                       active:
 *                         type: boolean
 *                       createdAt:
 *                         type: date
 *                       updatedAt:
 *                          type: date
 *                       staff:
 *                         type: object
 *                         properties:
 *                            id:
 *                               type: string
 *                            name:
 *                               type: string
 *                            phone:
 *                               type: string
 *                            isRoot:
 *                               type: string
 *                            active:
 *                                type: boolean
 *                       drawer:
 *                          type: object
 *                          properties:
 *                            id:
 *                              type: string
 *                            name:
 *                              type: string
 *                            active:
 *                              type: boolean
 */
export default router;
