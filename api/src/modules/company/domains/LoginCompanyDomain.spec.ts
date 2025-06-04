import { Request } from 'express';
import { LoginCompanyCase } from '../cases/LoginCompanyCase';
import { LoginCompanyDomain } from './LoginCompanyDomain';

jest.mock('src/modules/company/cases/LoginCompanyCase');

const LoginCaseMock = LoginCompanyCase as jest.Mock<LoginCompanyCase>;

describe('LoginCompanyDomain', () => {
  let loginCase: jest.Mocked<LoginCompanyCase>;
  let loginDomain: LoginCompanyDomain;

  let request = {} as Request;
  let response = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as any;

  beforeEach(() => {
    loginCase = new LoginCaseMock() as jest.Mocked<LoginCompanyCase>;
    loginDomain = new LoginCompanyDomain(loginCase);
  });

  describe('company login', () => {
    it('should return an error 422', async () => {
      await loginDomain.login(request, response);

      expect(response.status).toHaveBeenCalledWith(422);
    });

    it('should return a success with status 201', async () => {
      const body = {
        email: 'joandersonreis1@gmail.com',
        password: '123456789',
      };

      request = {
        body,
      } as Request;

      await loginDomain.login(request, response);

      expect(response.status).toHaveBeenCalledWith(201);
    });
  });
});
