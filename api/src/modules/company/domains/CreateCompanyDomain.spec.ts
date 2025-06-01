import { Request } from 'express';
import { CreateCompanyCase } from '../cases/CreateCompanyCase';
import { CreateCompanyDomain } from './CreateCompanyDomain';

jest.mock('src/modules/company/cases/CreateCompanyCase');

const CreateCompanyCaseMock = CreateCompanyCase as jest.Mock<CreateCompanyCase>;

describe('CreateCompany', () => {
  let createCompanyCaseMock: jest.Mocked<CreateCompanyCase>;
  let createCompanyDomain: CreateCompanyDomain;

  let request = {} as Request;
  let response = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as any;

  beforeEach(() => {
    createCompanyCaseMock =
      new CreateCompanyCaseMock() as jest.Mocked<CreateCompanyCase>;
    createCompanyDomain = new CreateCompanyDomain(createCompanyCaseMock);
  });

  describe('create company', () => {
    it('should throw an error 422', async () => {
      await createCompanyDomain.create(request, response);

      expect(response.status).toHaveBeenCalledWith(422);
    });

    it('should create a admin and return a 201 status', async () => {
      const body = {
        email: 'joandersonreis210@gmail.com',
        password: '123456789',
        name: 'Gangatec',
        cnpj: '11.223.516/0001-00',
        plan: 'INITIAL',
      };

      request = {
        body,
      } as Request;

      await createCompanyDomain.create(request, response);

      expect(response.status).toHaveBeenCalledWith(201);
    });
  });
});
