import { Module } from '@nestjs/common';
import { WorkerRepositoryModulePrisma } from 'src/database/prisma/worker/WorkerRepositoryModulePrisma';
import { CreateWorkerCase } from './cases/CreateWorkerCase';
import { LoginWorkerCase } from './cases/LoginWorkerCase';
import { CreateWorkerDomain } from './domains/CreateWorkerDomain';
import { LoginWorkerDomain } from './domains/LoginWorkerDomain';

@Module({
  imports: [WorkerRepositoryModulePrisma],
  controllers: [CreateWorkerDomain, LoginWorkerDomain],
  providers: [CreateWorkerCase, LoginWorkerCase],
})
export class WorkerModule {}
