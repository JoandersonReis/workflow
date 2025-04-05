import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { prisma } from 'prisma/prisma';
import { Encrypt } from 'src/utils/Encrypt';
import { JWT } from 'src/utils/JWT';
import { config } from 'src/utils/config';
import { errorResponse } from 'src/utils/errorResponse';
import { Email } from '../entities/Email';
import { AdminRepository } from './admin.repository';
import { TCreateAdmin, TLoginAdmin } from './types';

@Injectable()
export class AdminService {
  private repository = new AdminRepository(prisma.admin);

  public async create(data: TCreateAdmin) {
    const email = new Email(data.email);
    const encrypt = new Encrypt(data.password);
    const password = encrypt.code();

    try {
      await this.repository.create<Prisma.AdminCreateInput>([
        {
          email: email.getValue(),
          password,
        },
      ]);

      return { message: 'Admin Cadastrado com Sucesso!' };
    } catch (err) {
      return errorResponse('E-mail já cadastrado', 400);
    }
  }

  public async login(data: TLoginAdmin) {
    const email = new Email(data.email);
    const encrypt = new Encrypt(data.password);

    const admin = await this.repository.getOne<Prisma.AdminWhereInput>({
      email: email.getValue(),
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
