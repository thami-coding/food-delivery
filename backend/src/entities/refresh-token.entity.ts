// refresh-token.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  Index,
} from "typeorm"
import { User } from "../entities/user.entity"

@Entity({ name: "refresh_tokens" })
export class RefreshToken {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Index()
  @Column({ name: "user_id", type: "uuid" })
  userId: string

  @ManyToOne(() => User, (user) => user.refreshTokens, {
    onDelete: "CASCADE",
  })
  user: User

  @Column({ name: "hashed_token", type: "text" })
  hashedToken: string

  @Index()
  @Column({ name: "expires_at"})
  expiresAt: Date

  @Index()
  @Column({ default: false })
  revoked: boolean

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date
}
