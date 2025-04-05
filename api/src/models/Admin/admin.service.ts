import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { prisma } from 'prisma/prisma';
import { Encrypt } from 'src/utils/Encrypt';
import { errorResponse } from 'src/utils/errorResponse';
import { Email } from '../entities/Email';
import { AdminRepository } from './admin.repository';
import { TCreateAdmin } from './types';

@Injectable()
export class AdminService {
  private repository = new AdminRepository(prisma.admin);

  public async create(data: TCreateAdmin) {
    const email = new Email(data.email);
    const encrypt = new Encrypt(data.password);
    const password = encrypt.code();

    console.log(password, encrypt);

    try {
      const admin = await this.repository.create<Prisma.AdminCreateInput>([
        {
          email: email.getValue(),
          password,
        },
      ]);

      return { admin: admin[0] };
    } catch (err) {
      return errorResponse('E-mail já cadastrado', 400);
    }
  }
}
