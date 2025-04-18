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

  public async execute(data: Admin) {
    const email = data.email;
    const descrypt = new Decrypt(data.password);

    console.log(email);

    const admin = await this.repository.getOne({
      email: email,
    });

    if (!admin) {
      throw errorResponse('Admin não cadastrado!', 400);
    }

    const compare = descrypt.descrypted(admin.password);

    if (!compare) {
      return errorResponse('Senha incorreta!', 400);
    }

    const token = JWT.generateToken(config.JWT.admin.access.secret, admin.id, {
      email: admin.email,
    });

    return { token };
  }
}
