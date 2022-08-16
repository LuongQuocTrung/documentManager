import { Staff } from "../entitys";

// create interafce
export interface ICreateStaff {
  name: string;
  phone: string;
  password: string;
  isRoot: boolean;
  active: boolean;
  auth: Staff | undefined;
}
