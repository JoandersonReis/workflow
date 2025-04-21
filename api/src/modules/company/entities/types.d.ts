import { UUID } from 'crypto';
import { Email } from 'src/modules/entities/Email';
import { Password } from 'src/modules/entities/Password';

export type TCompany = {
  id?: UUID;
  email: Email;
  password: Password;
  createdAt?: Date;
};
