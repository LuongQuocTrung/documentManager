import documentDAO from "../DAO/documentDAO";
import drawerDAO from "../DAO/drawerDAO";
import {
  ICreateDocument,
  IQueryDocument,
  IStorageDeliveryDoc,
} from "../models/models";
import responseMsg from "../const/responseMsg";
export default class documentService {
  static createDocument = async (document: ICreateDocument) => {
    const drawer = await drawerDAO.findDrawerById(document.drawerId);
    if (!drawer?.active) {
      return { data: null, message: responseMsg.CREATE_ERROR };
    }
    const rs = await documentDAO.createDocument(document);
    if (!rs) {
      return { data: null, message: responseMsg.CREATE_ERROR };
    }
    return { data: rs, message: responseMsg.CREATE_SUCCESS };
  };
  static updateDocument = async (document: ICreateDocument, id: string) => {
    const rs = await documentDAO.saveDocument(document, id);
    if (!rs) {
      return { data: null, message: responseMsg.UPDATE_ERROR };
    }
    return { data: rs, message: responseMsg.UPDATE_SUCCESS };
  };
  static findDocumentByID = async (id: string) => {
    const rs = await documentDAO.findDocumentById(id);
    if (!rs) {
      return { data: null, message: responseMsg.NOT_FOUND };
    }
    return { data: rs, message: responseMsg.SUCCESS };
  };
  static findDocuments = async (query: IQueryDocument) => {
    if (query.status != "waiting" && query.status != "stored") {
      query.status = null;
    }
    const rs = await documentDAO.findDocuments(query);
    if (!rs) {
      return { data: null, message: responseMsg.NOT_FOUND };
    }
    return { data: rs, message: responseMsg.SUCCESS };
  };

  static storageDelivery = async (params: IStorageDeliveryDoc) => {
    const rs = await documentDAO.storageDelivery(params);
    if (!rs) {
      return { data: null, message: responseMsg.UPDATE_STATUS_ERROR };
    }
    return { data: rs, message: responseMsg.UPDATE_SUCCESS };
  };
}
