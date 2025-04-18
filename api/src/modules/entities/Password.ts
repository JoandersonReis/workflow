import { errorResponse } from 'src/utils/errorResponse';

export class Password {
  constructor(private password: string) {
    this.validate();
    this.password = password;
  }

  private validate() {
    if (this.password.length < 8) {
      throw errorResponse('Senha muito curta!', 400);
    }
  }

  public getValue() {
    return this.password;
  }
}
