import { Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { Validation } from 'src/utils/Validation';
import { createAdminSchema } from './admin.schema';
import { AdminService } from './admin.service';

@Controller('/admin')
export class AdminController {
  constructor(private readonly service: AdminService) {}

  @Post('/')
  public async create(@Req() request: Request, @Res() response: Response) {
    try {
      Validation.validate(request, createAdminSchema);
      const body = request.body;

      const result = await this.service.create(body);

      return response.json(result);
    } catch (err) {
      return response.status(err.statusCode).json(err);
    }
  }
}
