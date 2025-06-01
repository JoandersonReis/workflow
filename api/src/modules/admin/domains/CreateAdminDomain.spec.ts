import { Request } from 'express';
import { CreateAdminCase } from '../cases/CreateAdminCase';
import { CreateAdminDomain } from './CreateAdminDomain';

jest.mock('src/modules/admin/cases/CreateAdminCase');

const CreateAdminCaseMock = CreateAdminCase as jest.Mock<CreateAdminCase>;

describe('CreateAdminDomain', () => {
  let createAdminCaseMock: jest.Mocked<CreateAdminCase>;
  let createAdminDomain: CreateAdminDomain;

  let request = {} as Request;
  let response = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as any;

  beforeEach(() => {
    createAdminCaseMock =
      new CreateAdminCaseMock() as jest.Mocked<CreateAdminCase>;
    createAdminDomain = new CreateAdminDomain(createAdminCaseMock);
  });

  describe('create', () => {
    it('should return 422 if invalidate schema', async () => {
      await createAdminDomain.create(request, response);

      expect(response.status).toHaveBeenCalledWith(422);
    });

    it('should return a created admin', async () => {
      const body = {
        email: 'joandersonreis4@gmail.com',
        password: '12191517eu',
      };

      request = {
        body,
      } as Request;

      await createAdminDomain.create(request, response);

      expect(response.status).toHaveBeenCalledWith(201);
      expect(response.json).toHaveReturned();
    });
  });
});
