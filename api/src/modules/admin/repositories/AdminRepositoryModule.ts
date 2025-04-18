import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/PrismaService';
import { AdminRepositoryAdapter } from '../adapters/AdminRepositoryAdapter';
import { AdminRepository } from './AdminRepository';

@Module({
  providers: [
    PrismaService,
    {
      provide: AdminRepositoryAdapter,
      useClass: AdminRepository,
    },
  ],
  exports: [AdminRepositoryAdapter],
})
export class AdminRepositoryModule {}
