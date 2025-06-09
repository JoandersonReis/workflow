import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/PrismaService';
import { WorkerRepositoryAdapter } from 'src/modules/worker/adpaters/WorkerRepositoryAdapter';
import { WorkerRepositoryModulePrisma } from './WorkerRepositoryPrisma';

@Module({
  providers: [
    PrismaService,
    {
      provide: WorkerRepositoryAdapter,
      useClass: WorkerRepositoryModulePrisma,
    },
  ],
  exports: [WorkerRepositoryAdapter],
})
export class WorkerRepositoryModule {}
