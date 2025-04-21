import { Module } from '@nestjs/common';
import { AdminRepositoryModulePrisma } from './database/prisma/admin/AdminRepositoryModulePrisma';
import { CompanyRepositoryModulePrisma } from './database/prisma/company/CompanyRepositoryModulePrisma';
import { AdminModule } from './modules/admin/AdminModule';
import { CompanyModule } from './modules/company/CompanyModule';

@Module({
  imports: [
    AdminModule,
    CompanyModule,
    // Prisma Modules Repositories
    AdminRepositoryModulePrisma,
    CompanyRepositoryModulePrisma,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
