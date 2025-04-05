export type TErrorResponse = {
  statusCode: number;
  message: string;
  errors?: object;
};

export type TSchemaType = 'body' | 'params' | 'queries';
