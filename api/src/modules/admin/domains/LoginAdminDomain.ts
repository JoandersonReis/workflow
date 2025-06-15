import { Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { Email } from 'src/modules/entities/Email';
import { Password } from 'src/modules/entities/Password';
import { loginSchema } from 'src/schemas/GlobalSchema';
import { Validation } from 'src/utils/Validation';
import { LoginAdminCase } from '../cases/LoginAdminCase';
import { Admin } from '../entities/Admin';

@Controller('/admin')
export class LoginAdminDomain {
  constructor(private readonly useCase: LoginAdminCase) {}

  @Post('/auth')
  public async login(@Req() request: Request, @Res() response: Response) {
    try {
      Validation.validate(request, loginSchema);
      const body = request.body;

      const admin = new Admin({
        email: new Email(body.email),
        password: new Password(body.password),
      });

      const result = await this.useCase.execute(admin);

      return response.status(201).json(result);
    } catch (err) {
      return response.status(err.statusCode || 500).json(err);
    }
  }
}
