import { Injectable } from '@nestjs/common';
import { Decrypt } from 'src/utils/Decrypt';
import { JWT } from 'src/utils/JWT';
import { config } from 'src/utils/config';
import { errorResponse } from 'src/utils/errorResponse';
import { CompanyRepositoryAdapter } from '../adapters/CompanyRepositoryAdapter';
import { LoginCompanyAdapter } from '../adapters/LoginCompanyAdapter';
import { TLoginCompanyResponse } from '../adapters/types';
import { Company } from '../entities/Company';

@Injectable()
export class LoginCompanyCase implements LoginCompanyAdapter {
  constructor(private repository: CompanyRepositoryAdapter) {}

  async execute(company: Company): Promise<TLoginCompanyResponse> {
    const companyHasExists = await this.repository.getOne({
      email: company.email,
    });

    if (!companyHasExists) throw errorResponse('E-mail não cadastrado!', 400);

    const decrypt = new Decrypt(company.password);

    if (!decrypt.descrypted(companyHasExists.password))
      throw errorResponse('Senha inválida!', 400);

    const token = JWT.generateToken(
      config.JWT.company.access.secret,
      companyHasExists.id,
      {
        email: companyHasExists.email,
        id: companyHasExists.id,
      },
    );

    return {
      token,
    };
  }
}
