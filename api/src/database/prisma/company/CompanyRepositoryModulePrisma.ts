import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/PrismaService';
import { CompanyRepositoryAdapter } from 'src/modules/company/adapters/CompanyRepositoryAdapter';
import { CompanyRepositoryPrisma } from './CompanyRepositoryPrisma';

@Module({
  providers: [
    PrismaService,
    {
      provide: CompanyRepositoryAdapter,
      useClass: CompanyRepositoryPrisma,
    },
  ],
  exports: [CompanyRepositoryAdapter],
})
export class CompanyRepositoryModulePrisma {}
