import {
  adminDatabase,
  AdminRepositoryMock,
} from 'src/database/mocks/AdminRepositoryMock';
import { AdminRepositoryPrisma } from 'src/database/prisma/admin/AdminRepositoryPrisma';
import { Email } from 'src/modules/entities/Email';
import { Password } from 'src/modules/entities/Password';
import { PrismaService } from '../../../../prisma/PrismaService';
import { Admin } from '../entities/Admin';
import { CreateAdminCase } from './CreateAdminCase';

describe('CreateAdminCase', () => {
  let createAdminCase: CreateAdminCase;
  let adminRepositoryMock = new AdminRepositoryMock();
  let adminRepository = new AdminRepositoryPrisma(new PrismaService());

  beforeEach(async () => {
    createAdminCase = new CreateAdminCase(adminRepositoryMock);
  });

  describe('create', () => {
    it('should be equal', async () => {
      const adminEntity = new Admin({
        id: adminDatabase.id,
        createdAt: adminDatabase.createdAt,
        email: new Email('joandersonreis@gmail.com'),
        password: new Password(adminDatabase.password),
      });

      const result = jest
        .spyOn(adminRepository, 'create')
        .mockImplementation(
          async () => await adminRepositoryMock.create(adminEntity),
        );

      expect(await createAdminCase.execute(adminEntity)).toBe(result);
    });
  });
});
