import { config } from 'src/utils/config';
import { z } from 'zod';

const password = z
  .string()
  .min(config.PASSWORD.min, 'Senha muito curta!')
  .max(config.PASSWORD.max, 'Senha maior que 16.');
const email = z.string().email('Formato de e-mail inválido!');

export const createAdminSchema = z.object({
  password,
  email,
});

export const loginAdminSchema = z.object({
  password,
  email,
});
