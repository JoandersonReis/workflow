import { Password } from 'src/modules/entities/Password';
import { TWorker } from './types';

export class Worker {
  constructor(private worker: TWorker) {}

  public get companyId() {
    return this.worker.companyId;
  }

  public get email() {
    return this.worker.email.getValue();
  }

  public get password(): Password {
    return this.worker.password;
  }

  public set password(value: Password) {
    this.worker.password = value;
  }

  public getValues() {
    return {
      email: this.worker.email.getValue(),
      password: this.worker.password.getValue(),
      name: this.worker.name,
      companyId: this.worker.companyId.getValue(),
      worktime: this.worker.worktime,
    };
  }
}
