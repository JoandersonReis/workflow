import { Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { Email } from 'src/modules/entities/Email';
import { Password } from 'src/modules/entities/Password';
import { createCompanySchema } from 'src/schemas/CompanySchema';
import { Validation } from 'src/utils/Validation';
import { CreateCompanyCase } from '../cases/CreateCompanyCase';
import { Company } from '../entities/Company';

@Controller('/company')
export class CreateCompanyDomain {
  constructor(private readonly useCase: CreateCompanyCase) {}

  @Post('/')
  async create(@Req() request: Request, @Res() response: Response) {
    try {
      Validation.validate(request, createCompanySchema);

      const body = request.body;

      const company = new Company({
        email: new Email(body.email),
        password: new Password(body.password),
      });

      const companyCreated = await this.useCase.execute(company);

      return response.status(201).json({ company: companyCreated });
    } catch (err) {
      return response.status(err.status).json(err);
    }
  }
}
