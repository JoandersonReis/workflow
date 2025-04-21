import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/PrismaService';

import { AdminRepositoryAdapter } from 'src/modules/admin/adapters/AdminRepositoryAdapter';
import { AdminRepositoryPrisma } from './AdminRepositoryPrisma';

@Module({
  providers: [
    PrismaService,
    {
      provide: AdminRepositoryAdapter,
      useClass: AdminRepositoryPrisma,
    },
  ],
  exports: [AdminRepositoryAdapter],
})
export class AdminRepositoryModulePrisma {}
