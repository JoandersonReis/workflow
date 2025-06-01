import { Request } from 'express';
import { AdminRepositoryPrisma } from 'src/database/prisma/admin/AdminRepositoryPrisma';
import { CreateAdminCase } from '../cases/CreateAdminCase';
import { CreateAdminDomain } from './CreateAdminDomain';

jest.mock('src/database/prisma/admin/AdminRepositoryPrisma');
jest.mock('src/modules/admin/cases/CreateAdminCase');

const AdminRepositoryMock =
  AdminRepositoryPrisma as jest.Mock<AdminRepositoryPrisma>;
const CreateAdminCaseMock = CreateAdminCase as jest.Mock<CreateAdminCase>;

describe('CreateAdminDomain', () => {
  let createAdminCaseMock: jest.Mocked<CreateAdminCase>;
  let createAdminDomain: CreateAdminDomain;

  beforeEach(() => {
    createAdminCaseMock =
      new CreateAdminCaseMock() as jest.Mocked<CreateAdminCase>;
    createAdminDomain = new CreateAdminDomain(createAdminCaseMock);
  });

  describe('create', () => {
    it('should return 422 if invalidate schema', async () => {
      const request = {} as Request;

      const response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as any;

      await createAdminDomain.create(request, response);

      expect(response.status).toHaveBeenCalledWith(422);
    });
  });
});
