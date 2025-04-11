import { Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { Email } from 'src/modules/entities/Email';
import { Password } from 'src/modules/entities/Password';
import { createAdminSchema } from 'src/schemas/AdminSchema';
import { Validation } from 'src/utils/Validation';
import { CreateAdminCase } from '../cases/CreateAdminCase';
import { Admin } from '../entities/Admin';

@Controller('/admin')
export class CreateAdminDomain {
  constructor(private readonly useCase: CreateAdminCase) {}

  @Post('/')
  public async create(@Req() request: Request, @Res() response: Response) {
    try {
      Validation.validate(request, createAdminSchema);
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
