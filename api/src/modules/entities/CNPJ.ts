import { errorResponse } from 'src/utils/errorResponse';

export class CNPJ {
  private cnpj: string;

  constructor(cnpj: string) {
    this.validate(cnpj);

    this.cnpj = this.format(cnpj);
  }

  private validate(value: string) {
    const regex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/;

    if (!regex.test(value)) {
      throw errorResponse('CNPJ inválido', 400);
    }
  }

  private format(value: string) {
    return value.split('.').join('').split('/').join('').split('-').join('');
  }

  public getValue(): string {
    return this.cnpj;
  }
}
