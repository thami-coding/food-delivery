import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { CartItem } from "../cart/cart_item_entity";

export enum userRoles {
  ADMIN = "admin",
  USER = "user",
}

@Entity()
export class Users {
  @PrimaryGeneratedColumn("uuid")
  userId: string;

  @Column({ length: 50, nullable: true })
  fullname: string;

  @Column({ length: 30, nullable: false, unique: true })
  username: string;

  @Column({ length: 60, nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ length: 10 })
  phone: string;

  @Column({ type: "enum", enum: userRoles, default: userRoles.USER })
  role: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
