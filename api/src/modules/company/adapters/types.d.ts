import { CompanyPlan } from '@prisma/client';

export type TCreateCompany = {
  email: string;
  password: string;
  name: string;
  cnpj: string;
  logo: string | null;
  plan: CompanyPlan;
};

export type TLoginCompanyResponse = {
  token: string;
  name: string;
};

export type TCompanyDatabase = TCreateCompany & {
  id: string;
  createdAt: Date;
};

export type TCompanyCreatedReturn = {
  id: string;
  email: string;
  cnpj: string;
  logo: string | null;
  name: string;
  createdAt: Date;
};
