import { TErrorResponse } from './types';

export function errorResponse(
  message: string,
  statusCode: number = 400,
  errors?: object,
): TErrorResponse {
  return {
    statusCode,
    message,
    errors,
  };
}
