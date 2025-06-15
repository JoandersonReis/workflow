import { Email } from './entities/Email';
import { Password } from './entities/Password';

export type TPagination = {
  limit: number;
  page: number;
};

export type TLogin = {
  email: Email;
  password: Password;
};

export type TLoginResponse = {
  token: string;
  name: string;
};
