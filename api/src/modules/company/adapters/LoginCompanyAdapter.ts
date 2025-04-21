import { Company } from '../entities/Company';
import { TLoginCompanyResponse } from './types';

export abstract class LoginCompanyAdapter {
  abstract execute(company: Company): Promise<TLoginCompanyResponse>;
}
