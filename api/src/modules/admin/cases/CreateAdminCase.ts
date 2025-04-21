import { Injectable } from '@nestjs/common';
import { Password } from 'src/modules/entities/Password';
import { Encrypt } from 'src/utils/Encrypt';
import { errorResponse } from 'src/utils/errorResponse';
import { AdminRepositoryAdapter } from '../adapters/AdminRepositoryAdapter';
import { CreateAdminAdapter } from '../adapters/CreateAdminAdapter';
import { Admin } from '../entities/Admin';

@Injectable()
export class CreateAdminCase implements CreateAdminAdapter {
  constructor(private readonly repository: AdminRepositoryAdapter) {}

  public async execute(admin: Admin) {
    const adminHasExists = await this.repository.getOne({ email: admin.email });

    if (adminHasExists) throw errorResponse('E-mail já cadastrado', 400);

    const encrypt = new Encrypt(admin.password);
    admin.password = new Password(encrypt.encrypted);

    const adminCreated = await this.repository.create(admin);

    return adminCreated;
  }
}
