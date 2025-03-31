export type CreateMessageParams = {
  chat_id: number;
  user_id: number;
  message: string;
  created_at: Date;
};

export type UpdateMessageParams = {
  chat_id: number;
  user_id: number;
  message: string;
  created_at: Date;
};
