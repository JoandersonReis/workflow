import { Module } from '@nestjs/common';
import { AdminRepositoryModulePrisma } from 'src/database/prisma/admin/AdminRepositoryModulePrisma';
import { CreateAdminCase } from './cases/CreateAdminCase';
import { LoginAdminCase } from './cases/LoginAdminCase';
import { CreateAdminDomain } from './domains/CreateAdminDomain';
import { LoginAdminDomain } from './domains/LoginAdminDomain';

@Module({
  imports: [AdminRepositoryModulePrisma],
  controllers: [CreateAdminDomain, LoginAdminDomain],
  providers: [CreateAdminCase, LoginAdminCase],
})
export class AdminModule {}
