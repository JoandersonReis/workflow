import { z } from 'zod';
import { email, password } from './GlobalSchema';

export const createAdminSchema = z.object({
  password,
  email,
});
