import { Prisma } from '@prisma/client';
import { Admin } from '../entities/Admin';
import { TAdminCreatedReturn, TAdminDatabase } from './types';

export abstract class AdminRepositoryAdapter {
  public abstract getOne(
    where: Prisma.AdminWhereInput,
  ): Promise<TAdminDatabase | null>;

  public abstract create(data: Admin): Promise<TAdminCreatedReturn>;
}
