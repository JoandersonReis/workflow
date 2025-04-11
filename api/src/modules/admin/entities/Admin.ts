import { Email } from 'src/modules/entities/Email';
import { Password } from 'src/modules/entities/Password';
import { TAdmin } from './types';

export class Admin {
  constructor(private props: TAdmin) {}

  set email(email: Email) {
    this.props.email = email;
  }

  set password(password: Password) {
    this.props.password = password.getValue();
  }

  getValues() {
    return this.props;
  }
}
