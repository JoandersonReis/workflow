import { Injectable } from '@nestjs/common';
import { TLogin } from 'src/modules/types';
import { Decrypt } from 'src/utils/Decrypt';
import { JWT } from 'src/utils/JWT';
import { config } from 'src/utils/config';
import { errorResponse } from 'src/utils/errorResponse';
import { CompanyRepositoryAdapter } from '../adapters/CompanyRepositoryAdapter';
import { LoginCompanyAdapter } from '../adapters/LoginCompanyAdapter';
import { TLoginCompanyResponse } from '../adapters/types';

@Injectable()
export class LoginCompanyCase implements LoginCompanyAdapter {
  constructor(private repository: CompanyRepositoryAdapter) {}

  async execute(data: TLogin): Promise<TLoginCompanyResponse> {
    const companyHasExists = await this.repository.getOne({
      email: data.email.getValue(),
    });

    if (!companyHasExists) throw errorResponse('E-mail não cadastrado!', 400);

    const decrypt = new Decrypt(data.password.getValue());

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
      name: companyHasExists.name,
    };
  }
}
