import { Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { Email } from 'src/modules/entities/Email';
import { ID } from 'src/modules/entities/ID';
import { Password } from 'src/modules/entities/Password';
import { createWorkerSchema } from 'src/schemas/WorkerSchema';
import { Validation } from 'src/utils/Validation';
import { CreateWorkerCase } from '../cases/CreateWorkerCase';
import { Worker } from '../entities/Worker';

@Controller('/worker')
export class CreateWorkerDomain {
  constructor(private readonly useCase: CreateWorkerCase) {}

  @Post('/')
  public async create(@Req() request: Request, @Res() response: Response) {
    try {
      Validation.validate(request, createWorkerSchema);

      const body = request.body;

      const worker = new Worker({
        email: new Email(body.email),
        companyId: new ID(request.companyId),
        password: new Password(body.password),
        name: body.name,
        worktime: body.worktime,
      });

      const result = await this.useCase.execute(worker);

      return response.status(201).json({ worker: result });
    } catch (err) {
      return response.status(err.statusCode || 500).json(err);
    }
  }
}
