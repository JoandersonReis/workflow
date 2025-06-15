import { TLogin, TLoginResponse } from 'src/modules/types';

export abstract class LoginWorkerAdapter {
  public abstract execute(login: TLogin): Promise<TLoginResponse>;
}
