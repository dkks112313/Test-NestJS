export type AuthInput = {
  email: string;
  password: string;
};

export type SingInData = {
  user_id: number;
  username: string;
  email: string;
};

export type AuthResult = {
  accessToken: string;
  user_id: number;
  username: string;
  email: string;
};
