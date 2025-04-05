import { z } from 'zod';

export const createAdminSchema = z.object({
  email: z.string().email('Formato de e-mail inválido!'),
  password: z.string().min(8, 'Senha muito curta!'),
});
