import { Staff } from "../entitys";

// search params interface
export interface IQueryStaff {
  limit: number;
  page: number;
  keyword: string;
  active: boolean;
}
