import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/PrismaService';
import { WorkerRepositoryAdapter } from 'src/modules/worker/adpaters/WorkerRepositoryAdapter';
import { WorkerRepositoryPrisma } from './WorkerRepositoryPrisma';

@Module({
  providers: [
    PrismaService,
    {
      provide: WorkerRepositoryAdapter,
      useClass: WorkerRepositoryPrisma,
    },
  ],
  exports: [WorkerRepositoryAdapter],
})
export class WorkerRepositoryModulePrisma {}
