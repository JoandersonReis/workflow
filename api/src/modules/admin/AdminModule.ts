import { Module } from '@nestjs/common';
import { CreateAdminCase } from './cases/CreateAdminCase';
import { LoginAdminCase } from './cases/LoginAdminCase';
import { CreateAdminDomain } from './domains/CreateAdminDomain';
import { LoginAdminDomain } from './domains/LoginAdminDomain';
import { AdminRepositoryModule } from './repositories/AdminRepositoryModule';

@Module({
  imports: [AdminRepositoryModule],
  controllers: [CreateAdminDomain, LoginAdminDomain],
  providers: [CreateAdminCase, LoginAdminCase],
})
export class AdminModule {}
