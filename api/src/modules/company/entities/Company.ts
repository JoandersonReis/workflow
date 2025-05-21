import { Email } from 'src/modules/entities/Email';
import { Password } from 'src/modules/entities/Password';
import { TCompany } from './types';

export class Company {
  constructor(private props: TCompany) {}

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

  public get cnpj(): string {
    return this.props.cnpj.getValue();
  }

  public getValues() {
    return {
      email: this.props.email.getValue(),
      password: this.props.password.getValue(),
      name: this.props.name,
      cnpj: this.props.cnpj.getValue(),
      category: this.props.category,
      logo: this.props.logo,
      location_latitude: this.props.location_latitude,
      location_longitude: this.props.location_longitude,
      plan: this.props.plan,
    };
  }
}
