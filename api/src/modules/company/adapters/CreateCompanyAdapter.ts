import { Company } from '../entities/Company';
import { TCompanyCreatedReturn } from './types';

export abstract class CreateCompanyAdapter {
  abstract execute(company: Company): Promise<TCompanyCreatedReturn>;
}
