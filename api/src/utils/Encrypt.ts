import { compareSync, genSaltSync, hashSync } from 'bcrypt';
import { errorResponse } from './errorResponse';

export class Encrypt {
  constructor(private password: string) {}

  public code(): string {
    const salt = genSaltSync();

    const hash = hashSync(this.password, salt);

    return hash;
  }

  public decode(encrypted: string): boolean {
    const compare = compareSync(this.password, encrypted);

    if (!compare) {
      throw errorResponse('Senha inválida!', 400);
    }

    return compare;
  }
}
