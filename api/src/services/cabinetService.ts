import responseMsg from "../const/responseMsg";
import cabinetDAO from "../dao/cabinet";
import { ICreateCabinet } from "../models/createRequest";
import { IQueryCabinet } from "../models/queryRequest";
export default class cabinetService {
  static findCabinets = async (query: IQueryCabinet) => {
    const rs = await cabinetDAO.findCabinets(query);
    if (!rs) {
      return { data: null, message: responseMsg.NOT_FOUND };
    }
    return { data: rs, message: responseMsg.SUCCESS };
  };
}
