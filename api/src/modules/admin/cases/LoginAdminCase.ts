import { Injectable } from '@nestjs/common';
import { config } from 'src/utils/config';
import { Decrypt } from 'src/utils/Decrypt';
import { errorResponse } from 'src/utils/errorResponse';
import { JWT } from 'src/utils/JWT';
import { AdminRepositoryAdapter } from '../adapters/AdminRepositoryAdapter';
import { LoginAdminAdapter } from '../adapters/LoginAdminAdapter';
import { Admin } from '../entities/Admin';

@Injectable()
export class LoginAdminCase implements LoginAdminAdapter {
  constructor(private readonly repository: AdminRepositoryAdapter) {}

  public async execute(admin: Admin) {
    const decrypt = new Decrypt(admin.password);

    const adminHasExists = await this.repository.getOne({
      email: admin.email,
    });

    if (!adminHasExists) throw errorResponse('Admin não cadastrado!', 400);

    if (!decrypt.descrypted(adminHasExists.password))
      throw errorResponse('Senha incorreta!', 400);

    const token = JWT.generateToken(
      config.JWT.admin.access.secret,
      adminHasExists.id,
      {
        email: adminHasExists.email,
      },
    );

    return { token };
  }
}
