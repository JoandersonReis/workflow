import { Injectable } from '@nestjs/common';
import { Password } from 'src/modules/entities/Password';
import { Encrypt } from 'src/utils/Encrypt';
import { errorResponse } from 'src/utils/errorResponse';
import { CompanyRepositoryAdapter } from '../adapters/CompanyRepositoryAdapter';
import { CreateCompanyAdapter } from '../adapters/CreateCompanyAdapter';
import { TCompanyCreatedReturn } from '../adapters/types';
import { Company } from '../entities/Company';

@Injectable()
export class CreateCompanyCase implements CreateCompanyAdapter {
  constructor(private repository: CompanyRepositoryAdapter) {}

  async execute(company: Company): Promise<TCompanyCreatedReturn> {
    const companyHasExists = await this.repository.getOne({
      email: company.email,
    });

    if (companyHasExists)
      throw errorResponse('Já existe usuário com esse email!', 400);

    const encrypt = new Encrypt(company.password);
    company.password = new Password(encrypt.encrypted);

    const companyCreated = await this.repository.create(company);

    return companyCreated;
  }
}
