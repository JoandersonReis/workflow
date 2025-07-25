import { Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { Email } from 'src/modules/entities/Email';
import { Password } from 'src/modules/entities/Password';
import { loginSchema } from 'src/schemas/GlobalSchema';
import { Validation } from 'src/utils/Validation';
import { LoginCompanyCase } from '../cases/LoginCompanyCase';

@Controller('/company')
export class LoginCompanyDomain {
  constructor(private readonly useCase: LoginCompanyCase) {}

  @Post('/auth')
  async login(@Req() request: Request, @Res() response: Response) {
    try {
      Validation.validate(request, loginSchema);

      const body = request.body;

      const data = {
        email: new Email(body.email),
        password: new Password(body.password),
      };

      const login = await this.useCase.execute(data);

      return response.status(201).json(login);
    } catch (err) {
      return response.status(err.statusCode || 500).json(err);
    }
  }
}
