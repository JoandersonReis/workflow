import { Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { Email } from 'src/modules/entities/Email';
import { Password } from 'src/modules/entities/Password';
import { loginAdminSchema } from 'src/schemas/AdminSchema';
import { Validation } from 'src/utils/Validation';
import { LoginAdminCase } from '../cases/LoginAdminCase';
import { Admin } from '../entities/Admin';

@Controller('/admin')
export class LoginAdminDomain {
  constructor(private readonly useCase: LoginAdminCase) {}

  @Post('/auth')
  public async login(@Req() request: Request, @Res() response: Response) {
    try {
      Validation.validate(request, loginAdminSchema);
      const body = request.body;

      const admin = new Admin({
        email: new Email(body.email),
        password: new Password(body.password),
      });

      const result = await this.useCase.execute(admin);

      return response.json(result);
    } catch (err) {
      return response.status(err.statusCode).json(err);
    }
  }
}
