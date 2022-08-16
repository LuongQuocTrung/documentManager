import { ICreateDocument } from "../models/createRequest";
import { IStorageDeliveryDoc } from "../models/commonRequest";
import { IQueryDocument } from "../models/queryRequest";
import documentService from "../services/documentService";
import { Request, Response, NextFunction } from "express";
import * as response from "../utils/response";
export default class documentController {
  static getdocumentById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const rs = await documentService.findDocumentByID(req.params.id);
      if (!rs.data) {
        return response.r400(res, rs.message);
      }
      return response.r200(res, rs.data, rs.message);
    } catch (error) {
      next(error);
    }
  };
  static getDocuments = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const query: IQueryDocument = req.query as never;
      const rs = await documentService.findDocuments(query);
      if (!rs.data) {
        return response.r404(res, rs.message);
      }
      return response.r200(res, rs.data, rs.message);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
  static createDocument = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const document: ICreateDocument = req.body as ICreateDocument;
      document.staffId = res.locals.auth.id;
      const rs = await documentService.createDocument(document);
      if (!rs.data) {
        return response.r400(res, rs.message);
      }
      return response.r200(res, rs.data, rs.message);
    } catch (error) {
      next(error);
    }
  };
  static storageDelivery = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const params: IStorageDeliveryDoc = {
        drawerId: req.body.drawerId,
        id: req.params.id,
      } as IStorageDeliveryDoc;
      const rs = await documentService.storageDelivery(params);
      if (!rs.data) {
        return response.r404(res, rs.message);
      }
      return response.r200(res, rs.data, rs.message);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
  static updateDocument = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const document: ICreateDocument = req.body as ICreateDocument;
      document.staffId = res.locals.auth.id;
      const rs = await documentService.updateDocument(document, req.params.id);
      if (!rs.data) {
        return response.r400(res, rs.message);
      }
      return response.r200(res, rs.data, rs.message);
    } catch (error) {
      next(error);
    }
  };
}
