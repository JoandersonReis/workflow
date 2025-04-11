import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Encrypt } from 'src/utils/Encrypt';
import { errorResponse } from 'src/utils/errorResponse';
import { Email } from '../../entities/Email';
import { CreateAdminAdapter } from '../adapters/CreateAdminAdapter';
import { Admin } from '../entities/Admin';
import { AdminRepository } from '../repositories/AdminRepository';

@Injectable()
export class CreateAdminCase implements CreateAdminAdapter {
  constructor(private readonly repository: AdminRepository) {}

  public async execute(data: Admin) {
    const email = new Email(data.email.getValue());
    const encrypt = new Encrypt(data.password.getValue());
    const password = encrypt.code();

    try {
      const adminCreated =
        await this.repository.create<Prisma.AdminCreateInput>([
          {
            email: email.getValue(),
            password,
          },
        ]);

      const admin = new Admin({
        email: adminCreated.email,
        password: adminCreated.password,
        id: adminCreated.id,
        createdAt: adminCreated.createdAt,
      });

      return admin;
    } catch (err) {
      return errorResponse('E-mail já cadastrado', 400);
    }
  }
}
