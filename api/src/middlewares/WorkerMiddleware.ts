import { Injectable, NestMiddleware, Req, Res } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { config } from 'src/utils/config';
import { errorResponse } from 'src/utils/errorResponse';
import { JWT } from 'src/utils/JWT';
import { TTokenPayload } from './types';

@Injectable()
export class WorkerMiddleware implements NestMiddleware {
  use(@Req() request: Request, @Res() response: Response, next: NextFunction) {
    const [bearer, accessToken] = String(request.headers.authorization).split(
      ' ',
    );

    if (!bearer)
      return response.json(
        errorResponse('Formato de token precisa ser bearer!', 401),
      );
    if (!accessToken)
      return response.json(errorResponse('Token é obrigatório', 401));

    try {
      const payload = JWT.verifyToken(
        config.JWT.company.access.secret,
        accessToken,
      ) as TTokenPayload;

      request.companyId = payload.sub;

      next();
    } catch (err) {
      return response.status(err.statusCode || 500).json(err);
    }
  }
}
