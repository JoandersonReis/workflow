import { Request } from 'express';
import { AnyZodObject } from 'zod';
import { errorResponse } from './errorResponse';
import { TSchemaType } from './types';

export class Validation {
  static validate(
    request: Request,
    schema: AnyZodObject,
    type: TSchemaType = 'body',
  ) {
    try {
      request[type] = schema.parse(request[type]);
    } catch (error: any) {
      const errors = error.issues.map((item: any) => {
        return {
          field: item.path[0],
          error: item.message,
        };
      });

      throw errorResponse('Campos inválidos!', 422, errors);
    }
  }
}
