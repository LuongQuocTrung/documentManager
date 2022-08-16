import * as express from "express";
import inventoryCOntroller from "../controllers/inventory";
import { auth } from "../middleware/auth";
import * as validate from "./validate/inventory";
const router = express.Router();
router.use(auth);
/**
 * @openapi
 * tags:
 *  name: Inventory
 */
router.get("/", validate.queryInventory, inventoryCOntroller.getInventories);
/**
 * @openapi
 * /inventory:
 *   get:
 *     summary: Get inventories
 *     tags: [Inventory]
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
 *         name: companyId
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
 *                       company:
 *                         type: object
 *                         properties:
 *                            id:
 *                              type: string
 *                            name:
 *                              type: string
 *                            address:
 *                              type: string
 *                            typeCompany:
 *                              type: string
 *                            active:
 *                              type: boolean
 */
export default router;
