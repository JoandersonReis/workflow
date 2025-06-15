import { config } from 'src/utils/config';
import { z } from 'zod';

export const password = z
  .string()
  .min(config.PASSWORD.min, 'Senha muito curta!')
  .max(config.PASSWORD.max, 'Senha maior que 16.');
export const email = z.string().email('Formato de e-mail inválido!');

export const loginSchema = z.object({
  password,
  email,
});
