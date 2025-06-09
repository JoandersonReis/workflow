import { Email } from 'src/modules/entities/Email';
import { ID } from 'src/modules/entities/ID';
import { Password } from 'src/modules/entities/Password';

export type TWorker = {
  email: Email;
  password: Password;
  name: string;
  worktime: number;
  companyId: ID;
};
