import {
  Entity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  Unique,
  PrimaryColumn,
} from 'typeorm';

@Entity({ name: 'ChatMembers' })
@Unique(['chat_id', 'user_id'])
export class ChatMember {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn()
  chat_id: number;

  @PrimaryColumn()
  user_id: number;

  @CreateDateColumn()
  joined_at: Date;
}
