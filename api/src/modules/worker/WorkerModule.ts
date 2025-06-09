import { Module } from '@nestjs/common';
import { WorkerRepositoryModulePrisma } from 'src/database/prisma/worker/WorkerRepositoryPrisma';
import { CreateWorkerCase } from './cases/CreateWorkerCase';
import { CreateWorkerDomain } from './domains/CreateWorkerDomain';

@Module({
  imports: [WorkerRepositoryModulePrisma],
  controllers: [CreateWorkerDomain],
  providers: [CreateWorkerCase],
})
export class WorkerModule {}
