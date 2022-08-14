import {
  Entity,
  Column,
  BeforeInsert,
  JoinColumn,
  ManyToOne,
  OneToMany,
  BeforeUpdate,
} from "typeorm";
import BaseModel from "./Base";
import * as bcrypt from "bcryptjs";
import Department from "./Department";
import Document from "./Document";

@Entity("Staff")
export default class Staff extends BaseModel {
  @Column()
  name: string;

  @Column()
  phone: string;

  @Column({ select: false })
  password: string;

  @Column()
  isRoot?: boolean;

  @Column()
  active?: boolean;

  @ManyToOne(() => Department, (department) => department.staffs)
  @JoinColumn()
  department: Department;

  @OneToMany(() => Document, (document) => document.staff)
  documents: Document[];
  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    this.password = await bcrypt.hash(this.password, 10);
  }
  toJSON() {
    return {
      ...this,
      password: undefined,
    };
  }
}
