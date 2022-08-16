import * as express from "express";
import commonController from "../controllers/common";
import * as validate from "./validate/common";
import { auth } from "../middleware/auth";
const router = express.Router();
/**
 * @openapi
 * tags:
 *  name: Common
 */
router.post("/login", validate.login, commonController.login);
/**
 * @openapi
 * /login:
 *   post:
 *     summary: Login
 *     tags: [Common]
 *     security:
 *      - bearerAuth: []
 *     requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      phone:
 *                          type: string
 *                          default: '0935706611'
 *                      password:
 *                          type: string
 *                          default: '1234'
 *     responses:
 *          200:
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                              data:
 *                                  type: object
 *                                  properties:
 *                                      phone:
 *                                          type: string
 *                                      name:
 *                                          type: string
 *                                      token:
 *                                          type: string
 */
router.get("/option", auth, commonController.getCategory);
/**
 * @openapi
 * /option:
 *   get:
 *     summary: get option
 *     tags: [Common]
 *     security:
 *      - bearerAuth: []
 *     responses:
 *          200:
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                              data:
 *                                  type: object
 *                                  properties:
 *                                      DocumentStatus:
 *                                          type: array
 *                                          items:
 *                                              type: object
 *                                              properties:
 *                                                  id:
 *                                                      type: string
 *                                                  name:
 *                                                      type: string
 *                                      CompanyType:
 *                                          type: array
 *                                          items:
 *                                              type: object
 *                                              properties:
 *                                                  id:
 *                                                      type: string
 *                                                  name:
 *                                                      type: string
 */
router.get("/me", auth, commonController.getMe);
/**
 * @openapi
 * /me:
 *   get:
 *     summary: get profile
 *     tags: [Common]
 *     security:
 *      - bearerAuth: []
 *     responses:
 *          200:
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                              data:
 *                                  type: object
 *                                  properties:
 *                                      id:
 *                                          type: string
 *                                      name:
 *                                          type: string
 *                                      phone:
 *                                          type: string
 *                                      isRoot:
 *                                          type: boolean
 *                                      active:
 *                                          type: boolean
 *                                      department:
 *                                          type: object
 *                                          properties:
 *                                              id:
 *                                                  type: string
 *                                              name:
 *                                                  type: string
 *                                              active:
 *                                                  type: boolean
 *                                      token:
 *                                          type: string
 */
export default router;
