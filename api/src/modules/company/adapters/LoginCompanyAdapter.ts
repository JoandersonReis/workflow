import { TLogin, TLoginResponse } from 'src/modules/types';

export abstract class LoginCompanyAdapter {
  abstract execute(data: TLogin): Promise<TLoginResponse>;
}
