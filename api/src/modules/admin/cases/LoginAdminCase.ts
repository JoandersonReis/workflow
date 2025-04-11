import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { config } from 'src/utils/config';
import { Encrypt } from 'src/utils/Encrypt';
import { errorResponse } from 'src/utils/errorResponse';
import { JWT } from 'src/utils/JWT';
import { LoginAdminAdapter } from '../adapters/LoginAdminAdapter';
import { Admin } from '../entities/Admin';
import { AdminRepository } from '../repositories/AdminRepository';

@Injectable()
export class LoginAdminCase implements LoginAdminAdapter {
  constructor(private readonly repository: AdminRepository) {}

  public async execute(data: Admin) {
    const email = data.email.getValue();
    const encrypt = new Encrypt(data.password.getValue());

    const admin = await this.repository.getOne<Prisma.AdminWhereInput>({
      email: email,
    });

    if (!admin) {
      throw errorResponse('Admin não cadastrado!', 400);
    }

    encrypt.decode(admin.password);

    const token = JWT.generateToken(config.JWT.admin.access.secret, admin.id, {
      email: admin.email,
    });

    return { token };
  }
}
