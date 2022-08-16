import { Entity, Column, BeforeInsert, BeforeUpdate } from "typeorm";
import BaseModel from "./Base";
import * as bcrypt from "bcryptjs";

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
  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
