import { genSaltSync, hashSync } from 'bcrypt';

export class Encrypt {
  constructor(private value: string) {}

  public get encrypted(): string {
    const salt = genSaltSync();

    const hash = hashSync(this.value, salt);

    return hash;
  }
}
