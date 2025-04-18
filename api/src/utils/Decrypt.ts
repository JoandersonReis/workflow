import { compareSync } from 'bcrypt';

export class Decrypt {
  constructor(private value: string) {}

  public descrypted(encrypted: string): boolean {
    const compare = compareSync(this.value, encrypted);

    return compare;
  }
}
