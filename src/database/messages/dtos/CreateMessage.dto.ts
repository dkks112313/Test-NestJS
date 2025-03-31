export class CreateMessageDto {
  chat_id: number;
  user_id: number;
  message: string;
  created_at: Date;
}
