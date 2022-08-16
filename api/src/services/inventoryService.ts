import responseMsg from "../const/responseMsg";
import inventoryDAO from "../dao/inventory";
import { IcreateIventory } from "../models/createRequest";
import { IQueryInventory } from "../models/queryRequest";

export default class inventoryService {
  static findInventories = async (query: IQueryInventory) => {
    const rs = await inventoryDAO.findInventories(query);
    if (!rs) {
      return { data: null, message: responseMsg.UPDATE_ERROR };
    }
    return { data: rs, message: responseMsg.UPDATE_SUCCESS };
  };
}
