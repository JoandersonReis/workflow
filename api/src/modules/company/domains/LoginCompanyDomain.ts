import { Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { Email } from 'src/modules/entities/Email';
import { Password } from 'src/modules/entities/Password';
import { loginCompanySchema } from 'src/schemas/CompanySchema';
import { Validation } from 'src/utils/Validation';
import { LoginCompanyCase } from '../cases/LoginCompanyCase';
import { Company } from '../entities/Company';

@Controller('/company')
export class LoginCompanyDomain {
  constructor(private readonly useCase: LoginCompanyCase) {}

  @Post('/auth')
  async login(@Req() request: Request, @Res() response: Response) {
    try {
      Validation.validate(request, loginCompanySchema);

      const body = request.body;

      const company = new Company({
        email: new Email(body.email),
        password: new Password(body.password),
      });

      const login = await this.useCase.execute(company);

      return response.json(login);
    } catch (err) {
      return response.status(err.status).json(err);
    }
  }
}
