import { z } from 'zod';

export const createWorkerSchema = z.object({
  name: z.string().min(2, 'Nome é obrigatório!').toLowerCase(),
  email: z.string().email(),
  password: z.string().min(8, 'Senha tem que ser maior que 8 caracteres!'),
  companyId: z.string().uuid(),
  worktime: z.number(),
});
