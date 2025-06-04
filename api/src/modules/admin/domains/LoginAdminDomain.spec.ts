import { Request } from 'express';
import { LoginAdminCase } from '../cases/LoginAdminCase';
import { LoginAdminDomain } from './LoginAdminDomain';

jest.mock('src/modules/admin/cases/LoginAdminCase');

const LoginCaseMock = LoginAdminCase as jest.Mock<LoginAdminCase>;

describe('LoginAdminDomain', () => {
  let loginCase: jest.Mocked<LoginAdminCase>;
  let loginDomain: LoginAdminDomain;

  let request = {} as Request;
  let response = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as any;

  beforeEach(() => {
    loginCase = new LoginCaseMock() as jest.Mocked<LoginAdminCase>;
    loginDomain = new LoginAdminDomain(loginCase);
  });

  describe('admin login', () => {
    it('should return an error 422', async () => {
      await loginDomain.login(request, response);

      expect(response.status).toHaveBeenCalledWith(422);
    });

    it('should return a success with status 201', async () => {
      const body = {
        email: 'joandersonreis470@gmail.com',
        password: '12345678',
      };

      request = {
        body,
      } as Request;

      await loginDomain.login(request, response);

      expect(response.status).toHaveBeenCalledWith(201);
    });
  });
});
