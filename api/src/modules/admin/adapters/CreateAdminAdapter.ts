import { Admin } from '../entities/Admin';
import { TAdminCreatedReturn } from './types';

export abstract class CreateAdminAdapter {
  abstract execute(admin: Admin): Promise<TAdminCreatedReturn>;
}
