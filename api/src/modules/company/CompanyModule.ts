import { Module } from '@nestjs/common';
import { CompanyRepositoryModulePrisma } from 'src/database/prisma/company/CompanyRepositoryModulePrisma';
import { CreateCompanyCase } from './cases/CreateCompanyCase';
import { LoginCompanyCase } from './cases/LoginCompanyCase';
import { CreateCompanyDomain } from './domains/CreateCompanyDomain';
import { LoginCompanyDomain } from './domains/LoginCompanyDomain';

@Module({
  imports: [CompanyRepositoryModulePrisma],
  controllers: [CreateCompanyDomain, LoginCompanyDomain],
  providers: [CreateCompanyCase, LoginCompanyCase],
})
export class CompanyModule {}
