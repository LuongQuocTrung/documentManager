import { AppDataSource } from "../config/data-source";
import { Document, Drawer } from "../entitys";
import { ICreateDocument } from "../models/createRequest";
import drawerDAO from "./drawer";
import StaffDAO from "./staff";
import { IQueryDocument } from "../models/queryRequest";
import { IStorageDeliveryDoc } from "../models/commonRequest";
const documentResponsitory = AppDataSource.getRepository(Document);

export default class documentDAO {
  static findDocumentById = async (id: string): Promise<Document | null> => {
    const rs = await documentResponsitory.findOne({
      where: { id: id },
      relations: { staff: true, drawer: true },
    });
    if (!rs) {
      return null;
    }
    return rs;
  };
  static findDocuments = async (query: IQueryDocument): Promise<Document[]> => {
    const limit = query.limit ? Math.floor(query.limit) : 20;
    const keyword = query.keyword ? "%" + query.keyword + "%" : "%%";
    const skip = query.page > 0 ? Math.floor(query.page - 1) * limit : 0;
    console.log(keyword);
    const queryString = await documentResponsitory
      .createQueryBuilder("Document")
      .innerJoinAndSelect("Document.staff", "Staff")
      .innerJoinAndSelect("Document.drawer", "Drawer")
      .where("Document.title LIKE :title", { title: keyword });
    if (query.status) {
      await queryString.andWhere("Document.status = :status", {
        status: query.status,
      });
    }
    if (query.drawerId) {
      await queryString.andWhere("Drawer.id = :id", { id: query.drawerId });
    }
    if (query.createdAt) {
      const before = new Date(query.createdAt);
      const after = new Date(
        new Date(query.createdAt).getTime() + 24 * 60 * 60 * 1000
      );
      await queryString
        .andWhere("Document.createdAt > :before", { before })
        .andWhere("Document.createdAt < :after", { after });
    }

    return await queryString.limit(limit).offset(skip).getMany();
  };
  static createDocument = async (
    document: ICreateDocument
  ): Promise<Document | null> => {
    const staff = await StaffDAO.findStaffById(document.staffId);
    const drawer = await drawerDAO.findDrawerById(document.drawerId);
    if (!staff || !drawer) {
      return null;
    }
    const createDocument = await documentResponsitory.save(
      documentResponsitory.create({
        ...document,
        staff,
        drawer,
        status: "waiting",
      })
    );
    return createDocument;
  };
  static saveDocument = async (
    document: ICreateDocument,
    id: string
  ): Promise<Document | null> => {
    const oldDocument = this.findDocumentById(id);
    const staff = await StaffDAO.findStaffById(document.staffId);
    const drawer = await drawerDAO.findDrawerById(document.drawerId);
    if (!oldDocument || !staff || !drawer) {
      return null;
    }
    const updateDocument = await documentResponsitory.save(
      Object.assign(oldDocument, { ...document, staff: staff, drawer: drawer })
    );
    return updateDocument;
  };
  static storageDelivery = async (
    params: IStorageDeliveryDoc
  ): Promise<Document | null> => {
    const oldDocument = await this.findDocumentById(params.id);
    const drawer: Drawer | null = await drawerDAO.findDrawerById(
      params.drawerId
    );
    if (!drawer || !oldDocument) {
      return null;
    }
    const updateDoc = await documentResponsitory.save(
      Object.assign(oldDocument, { drawer: drawer, status: "stored" })
    );
    return updateDoc;
  };
}
