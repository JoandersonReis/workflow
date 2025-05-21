import { CompanyCategory, CompanyPlan } from '@prisma/client';

export type TCreateCompany = {
  email: string;
  password: string;
  name: string;
  cnpj: string;
  category: CompanyCategory;
  logo: string | null;
  location_latitude: string | null;
  location_longitude: string | null;
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
  createdAt: Date;
};
