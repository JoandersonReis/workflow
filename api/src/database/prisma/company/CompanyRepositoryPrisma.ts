import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/PrismaService';
import { CompanyRepositoryAdapter } from 'src/modules/company/adapters/CompanyRepositoryAdapter';
import {
  TCompanyCreatedReturn,
  TCompanyDatabase,
} from 'src/modules/company/adapters/types';
import { Company } from 'src/modules/company/entities/Company';

@Injectable()
export class CompanyRepositoryPrisma implements CompanyRepositoryAdapter {
  constructor(private prisma: PrismaService) {}

  public async getOne(
    where: Prisma.CompanyWhereUniqueInput,
  ): Promise<TCompanyDatabase | null> {
    const company = await this.prisma.company.findUnique({
      where,
    });

    return company;
  }

  public async create(data: Company): Promise<TCompanyCreatedReturn> {
    const company = await this.prisma.company.create({
      data: data.getValues(),
      select: {
        email: true,
        id: true,
        createdAt: true,
        cnpj: true,
        logo: true,
        name: true,
        plan: true,
      },
    });

    return company;
  }
}
