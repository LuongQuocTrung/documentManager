import * as express from "express";
import cabinetController from "../controllers/cabinet";
import { auth } from "../middleware/auth";
import * as validate from "./validate/cabinet";
const router = express.Router();
router.use(auth);
/**
 * @openapi
 * tags:
 *  name: Cabinet
 */
router.get("/", validate.queryCabinet, cabinetController.getCabinets);
/**
 * @openapi
 * /cabinet:
 *   get:
 *     summary: Get cabinets
 *     tags: [Cabinet]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *       - in: query
 *         name: inventoryId
 *         schema:
 *            type: string
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
 *                     type: array
 *                     items:
 *                      properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       inventory:
 *                         type: object
 *                         properties:
 *                            id:
 *                              type: string
 *                            name:
 *                              type: string
 */
export default router;
