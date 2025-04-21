import { Prisma } from '@prisma/client';
import { Company } from '../entities/Company';
import { TCompanyCreatedReturn, TCompanyDatabase } from './types';

export abstract class CompanyRepositoryAdapter {
  public abstract getOne(
    where: Prisma.CompanyWhereUniqueInput,
  ): Promise<TCompanyDatabase | null>;

  public abstract create(data: Company): Promise<TCompanyCreatedReturn>;
}
