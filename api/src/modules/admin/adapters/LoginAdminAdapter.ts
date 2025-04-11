import { TErrorResponse } from 'src/utils/types';
import { Admin } from '../entities/Admin';
import { TLoginAdminResponse } from './types';

export abstract class LoginAdminAdapter {
  abstract execute(data: Admin): Promise<TLoginAdminResponse | TErrorResponse>;
}
