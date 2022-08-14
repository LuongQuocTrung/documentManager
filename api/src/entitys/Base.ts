import { PrimaryGeneratedColumn, BaseEntity } from "typeorm";
import { PrimaryGeneratedColumnUUIDOptions } from "typeorm/decorator/options/PrimaryGeneratedColumnUUIDOptions";

export default abstract class BaseModel extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;
}
