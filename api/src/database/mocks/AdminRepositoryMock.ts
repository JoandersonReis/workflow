import { Prisma } from '@prisma/client';
import { randomUUID } from 'crypto';
import { AdminRepositoryAdapter } from 'src/modules/admin/adapters/AdminRepositoryAdapter';
import {
  TAdminCreatedReturn,
  TAdminDatabase,
} from 'src/modules/admin/adapters/types';
import { Admin } from 'src/modules/admin/entities/Admin';

export let adminDatabase: TAdminDatabase = {
  id: randomUUID(),
  createdAt: new Date(),
  email: 'teste10@gmail.com',
  password: '1234546789',
};

export class AdminRepositoryMock implements AdminRepositoryAdapter {
  public async getOne(
    where: Prisma.AdminWhereUniqueInput,
  ): Promise<TAdminDatabase | null> {
    if (where.email !== adminDatabase.email) {
      return null;
    }

    if (where.id !== adminDatabase.id) {
      return null;
    }

    return adminDatabase;
  }
  public async create(data: Admin): Promise<TAdminCreatedReturn> {
    const admin: TAdminCreatedReturn = {
      createdAt: new Date(),
      email: data.email,
      id: randomUUID(),
    };

    return admin;
  }
}
