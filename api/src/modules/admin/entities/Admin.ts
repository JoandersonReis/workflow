import { Email } from 'src/modules/entities/Email';
import { Password } from 'src/modules/entities/Password';
import { TAdmin } from './types';

export class Admin {
  constructor(private props: TAdmin) {}

  set email(email: Email) {
    this.props.email = email;
  }

  public set password(password: Password) {
    this.props.password = password;
  }

  public get email(): string {
    return this.props.email.getValue();
  }

  public get password(): string {
    return this.props.password.getValue();
  }

  getValues() {
    return {
      email: this.props.email.getValue(),
      password: this.props.password.getValue(),
    };
  }
}
