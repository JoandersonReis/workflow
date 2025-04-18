export type TCreateAdmin = {
  email: string;
  password: string;
};

export type TLoginAdminResponse = {
  token: string;
};

export type TAdminDatabase = {
  id: string;
  email: string;
  password: string;
  createdAt: Date;
};

export type TAdminCreatedReturn = {
  id: string;
  email: string;
  createdAt: Date;
};
