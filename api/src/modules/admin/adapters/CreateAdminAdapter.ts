import { TErrorResponse } from 'src/utils/types';
import { Admin } from '../entities/Admin';

export abstract class CreateAdminAdapter {
  abstract execute(data: Admin): Promise<Admin | TErrorResponse>;
}
