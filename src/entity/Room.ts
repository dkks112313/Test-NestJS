import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity({ name: 'Rooms' })
export class Room {
  @PrimaryGeneratedColumn()
  chat_id: number;

  @Column({ unique: true })
  chat_name: string;

  @CreateDateColumn()
  created_at: Date;
}
