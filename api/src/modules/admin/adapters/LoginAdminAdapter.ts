import { Admin } from '../entities/Admin';
import { TLoginAdminResponse } from './types';

export abstract class LoginAdminAdapter {
  abstract execute(admin: Admin): Promise<TLoginAdminResponse>;
}
