export type CreateMessageParams = {
  message_id: number;
  chat_id: number;
  user_id: number;
  message: string;
};

export type UpdateMessageParams = {
  message_id: number;
  chat_id: number;
  user_id: number;
  message: string;
};
