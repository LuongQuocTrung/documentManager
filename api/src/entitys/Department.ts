import { Entity, Column, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import BaseModel from "./Base";
import Company from "./Company";
import Staff from "./Staff";
@Entity("Department")
export default class Department extends BaseModel {
  @Column()
  name: String;

  @Column()
  active?: boolean;

  @ManyToOne(() => Company, (company) => company.departments)
  @JoinColumn()
  company: Company;

  @OneToMany(() => Staff, (staff) => staff.department)
  staffs: Staff[];
}
