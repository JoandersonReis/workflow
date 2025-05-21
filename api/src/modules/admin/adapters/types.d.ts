export type TCreateAdmin = {
  email: string;
  password: string;
};

export type TLoginAdminResponse = {
  token: string;
};

export type TAdminDatabase = {
  id: UUID;
  email: string;
  password: string;
  createdAt: Date;
};

export type TAdminCreatedReturn = {
  id: UUID;
  email: string;
  createdAt: Date;
};
