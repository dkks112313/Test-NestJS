import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Unique,
  PrimaryColumn,
} from 'typeorm';

@Entity({ name: 'Messanges' })
@Unique(['chat_id', 'user_id'])
export class Message {
  @PrimaryGeneratedColumn()
  message_id: number;

  @PrimaryColumn()
  chat_id: number;

  @PrimaryColumn()
  user_id: number;

  @CreateDateColumn()
  created_at: Date;

  @Column()
  message: string;
}
