import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AdminRepositoryModulePrisma } from './database/prisma/admin/AdminRepositoryModulePrisma';
import { CompanyRepositoryModulePrisma } from './database/prisma/company/CompanyRepositoryModulePrisma';
import { WorkerRepositoryModule } from './database/prisma/worker/WorkerRepositoryModulePrisma';
import { WorkerMiddleware } from './middlewares/WorkerMiddleware';
import { AdminModule } from './modules/admin/AdminModule';
import { CompanyModule } from './modules/company/CompanyModule';
import { WorkerModule } from './modules/worker/WorkerModule';

@Module({
  imports: [
    AdminModule,
    CompanyModule,
    WorkerModule,
    // Prisma Modules Repositories
    AdminRepositoryModulePrisma,
    CompanyRepositoryModulePrisma,
    WorkerRepositoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(WorkerMiddleware).forRoutes('*');
  }
}
