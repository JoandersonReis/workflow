import { errorResponse } from 'src/utils/errorResponse';

export class Password {
  private password: string;

  constructor(password: string) {
    this.verify();
    this.password = password;
  }

  private verify() {
    if (this.password.length <= 8) {
      throw errorResponse('Senha muito curta!', 400);
    }

    if (this.password.length > 16) {
      throw errorResponse('Senha maior que 16!', 400);
    }
  }

  public getValue() {
    return this.password;
  }
}
