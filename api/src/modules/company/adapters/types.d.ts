export type TCreateCompany = {
  email: string;
  password: string;
};

export type TLoginCompanyResponse = {
  token: string;
};

export type TCompanyDatabase = {
  id: string;
  email: string;
  password: string;
  createdAt: Date;
};

export type TCompanyCreatedReturn = {
  id: string;
  email: string;
  createdAt: Date;
};
