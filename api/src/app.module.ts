import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AdminRepositoryModulePrisma } from './database/prisma/admin/AdminRepositoryModulePrisma';
import { CompanyRepositoryModulePrisma } from './database/prisma/company/CompanyRepositoryModulePrisma';

import { WorkerRepositoryModulePrisma } from './database/prisma/worker/WorkerRepositoryModulePrisma';
import { WorkerMiddleware } from './middlewares/WorkerMiddleware';
import { AdminModule } from './modules/admin/AdminModule';
import { CompanyModule } from './modules/company/CompanyModule';
import { WorkerModule } from './modules/worker/WorkerModule';
import { CreateWorkerDomain } from './modules/worker/domains/CreateWorkerDomain';

@Module({
  imports: [
    AdminModule,
    CompanyModule,
    WorkerModule,
    // Prisma Modules Repositories
    AdminRepositoryModulePrisma,
    CompanyRepositoryModulePrisma,
    WorkerRepositoryModulePrisma,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    // Routes for middleware scope
    consumer.apply(WorkerMiddleware).forRoutes(CreateWorkerDomain);
  }
}
