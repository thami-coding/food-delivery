import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Users } from "../users/users_entity";

@Entity()
export class Addresses {
  @PrimaryGeneratedColumn("uuid")
  addressId: string;

  @Column({ nullable: false, length: 60 })
  street: string;

  @Column({ nullable: false, length: 30 })
  city: string;

  @Column({ nullable: false, length: 60 })
  province: string;

  @Column({ nullable: false, length: 4 })
  zip_code: string;

  @OneToOne(() => Users, (users) => users.userId)
  @JoinColumn({ name: "userId" })
  userId: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
