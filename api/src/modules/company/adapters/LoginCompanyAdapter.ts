import { TLogin } from 'src/modules/types';
import { TLoginCompanyResponse } from './types';

export abstract class LoginCompanyAdapter {
  abstract execute(data: TLogin): Promise<TLoginCompanyResponse>;
}
