import { Prisma } from '@prisma/client';

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/PrismaService';
import { AdminRepositoryAdapter } from '../adapters/AdminRepositoryAdapter';
import { TAdminCreatedReturn, TAdminDatabase } from '../adapters/types';
import { Admin } from '../entities/Admin';

@Injectable()
export class AdminRepository implements AdminRepositoryAdapter {
  constructor(private prisma: PrismaService) {}

  public async getOne(
    where: Prisma.AdminWhereUniqueInput,
  ): Promise<TAdminDatabase | null> {
    const admin = await this.prisma.admin.findUnique({
      where,
    });

    return admin;
  }

  public async create(data: Admin): Promise<TAdminCreatedReturn> {
    const admin = await this.prisma.admin.create({
      data: data.getValues(),
      select: {
        email: true,
        id: true,
        createdAt: true,
      },
    });

    return admin;
  }
}
