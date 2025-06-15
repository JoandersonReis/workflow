import { Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { Email } from 'src/modules/entities/Email';
import { Password } from 'src/modules/entities/Password';
import { loginSchema } from 'src/schemas/GlobalSchema';
import { Validation } from 'src/utils/Validation';
import { LoginWorkerCase } from '../cases/LoginWorkerCase';

@Controller('/worker')
export class LoginWorkerDomain {
  constructor(private readonly useCase: LoginWorkerCase) {}

  @Post('/auth')
  async login(@Req() request: Request, @Res() response: Response) {
    try {
      Validation.validate(request, loginSchema);

      const body = request.body;

      const result = await this.useCase.execute({
        email: new Email(body.email),
        password: new Password(body.password),
      });

      return response.status(200).json(result);
    } catch (err) {
      return response.status(err.statusCode || 500).json(err);
    }
  }
}
