import * as express from "express";
import drawerController from "../controllers/drawer";
import { auth } from "../middleware/auth";
import * as validate from "./validate/drawer";
const router = express.Router();
router.use(auth);
/**
 * @openapi
 * tags:
 *  name: Drawer
 */
router.get("/", validate.queryDrawer, drawerController.getDrawers);
/**
 * @openapi
 * /drawer:
 *   get:
 *     summary: Get drawers
 *     tags: [Drawer]
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
 *         name: cabinetId
 *         schema:
 *            type: string
 *       - in: query
 *         name: active
 *         schema:
 *            type: boolean
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
 *                       active:
 *                         type: string
 *                       cabinet:
 *                         type: object
 *                         properties:
 *                            id:
 *                              type: string
 *                            name:
 *                              type: string
 */
router.get("/:id", validate.isUUID, drawerController.getDrawerById);
/**
 * @openapi
 * /drawer/{id}:
 *   get:
 *     summary: Get drawer
 *     tags: [Drawer]
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
 *                    type: object
 *                    properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       active:
 *                         type: boolean
 *                       cabinet:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                           name:
 *                             type: string
 */
router.post("/", validate.createDrawer, drawerController.createDrawer);
/**
 * @openapi
 * /drawer:
 *  post:
 *    summary: create drawer
 *    tags: [Drawer]
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *              active:
 *                type: string
 *              cabinetId:
 *                type: string
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *            type: object
 *            properties:
 *              message:
 *                type: string
 *              data:
 *                type: object
 *                properties:
 */
router.put(
  "/:id",
  validate.isUUID,
  validate.createDrawer,
  drawerController.updateDrawer
);
/**
 * @openapi
 * /drawer/{id}:
 *  put:
 *    summary: update drawer
 *    tags: [Drawer]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *              active:
 *                type: string
 *              cabinetId:
 *                type: string
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *            type: object
 *            properties:
 *              message:
 *                type: string
 *              data:
 *                type: object
 *                properties:
 */
router.patch(
  "/:id/active",
  validate.isUUID,
  drawerController.changeActiveDrawer
);
/**
 * @openapi
 * /drawer/{id}:
 *  patch:
 *    summary: change active drawer
 *    tags: [Drawer]
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *    responses:
 *      200:
 *        content:
 *          application/json:
 *            schema:
 *            type: object
 *            properties:
 *              message:
 *                type: string
 *              data:
 *                type: object
 *                properties:
 */
export default router;
