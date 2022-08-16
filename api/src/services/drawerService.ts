import drawerDAO from "../dao/drawer";
import { ICreateDrawer } from "../models/createRequest";
import { IQueryDrawer } from "../models/queryRequest";

import responseMsg from "../const/responseMsg";
export default class drawerService {
  static createDrawer = async (drawer: ICreateDrawer) => {
    const rs = await drawerDAO.createDrawer(drawer);
    if (!rs) {
      return { data: null, message: responseMsg.CREATE_ERROR };
    }
    return { data: rs, message: responseMsg.CREATE_SUCCESS };
  };
  static updateDrawer = async (drawer: ICreateDrawer, id: string) => {
    const rs = await drawerDAO.saveDrawer(drawer, id);
    if (!rs) {
      return { data: null, message: responseMsg.UPDATE_ERROR };
    }
    return { data: rs, message: responseMsg.UPDATE_SUCCESS };
  };
  static findDrawerById = async (id: string) => {
    const rs = await drawerDAO.findDrawerById(id);
    if (!rs) {
      return { data: null, message: responseMsg.NOT_FOUND };
    }
    return { data: rs, message: responseMsg.SUCCESS };
  };
  static findDrawers = async (query: IQueryDrawer) => {
    const rs = await drawerDAO.findDrawers(query);
    if (!rs) {
      return { data: null, message: responseMsg.NOT_FOUND };
    }
    return { data: rs, message: responseMsg.SUCCESS };
  };
  static changeActive = async (id: string) => {
    const rs = await drawerDAO.changeActive(id);
    if (!rs) {
      return { data: null, message: responseMsg.UPDATE_STATUS_ERROR };
    }
    return { data: rs, message: responseMsg.UPDATE_ERROR };
  };
}
