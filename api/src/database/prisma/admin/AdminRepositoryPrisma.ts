import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/PrismaService';
import { AdminRepositoryAdapter } from 'src/modules/admin/adapters/AdminRepositoryAdapter';
import {
  TAdminCreatedReturn,
  TAdminDatabase,
} from 'src/modules/admin/adapters/types';
import { Admin } from 'src/modules/admin/entities/Admin';

@Injectable()
export class AdminRepositoryPrisma implements AdminRepositoryAdapter {
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
