import { z } from 'zod';
import { email, password } from './GlobalSchema';

export const createCompanySchema = z.object({
  password,
  email,
});

export const loginCompanySchema = z.object({
  password,
  email,
});
