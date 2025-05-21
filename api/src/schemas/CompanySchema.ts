import { CompanyCategory, CompanyPlan } from '@prisma/client';
import { z } from 'zod';
import { email, password } from './GlobalSchema';

const categoryEnum = Object.keys(CompanyCategory).map(
  (key) => CompanyCategory[key],
) as [string, ...string[]];
const planEnum = Object.keys(CompanyPlan).map((key) => CompanyPlan[key]) as [
  string,
  ...string[],
];

export const createCompanySchema = z.object({
  password,
  email,
  name: z.string().min(2, 'Nome muito curto!').toLowerCase(),
  cnpj: z.string().min(14, 'CNPJ Muito curto!').max(18, 'CNPJ Muito longo!'),
  category: z.enum(categoryEnum),
  plan: z.enum(planEnum),
  location_latitude: z.string().optional(),
  location_longitude: z.string().optional(),
});

export const loginCompanySchema = z.object({
  password,
  email,
});
