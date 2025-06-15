import { Injectable } from '@nestjs/common';

import { TLogin, TLoginResponse } from 'src/modules/types';
import { Decrypt } from 'src/utils/Decrypt';
import { JWT } from 'src/utils/JWT';
import { config } from 'src/utils/config';
import { errorResponse } from 'src/utils/errorResponse';
import { LoginWorkerAdapter } from '../adpaters/LoginWorkerAdapter';
import { WorkerRepositoryAdapter } from '../adpaters/WorkerRepositoryAdapter';

@Injectable()
export class LoginWorkerCase implements LoginWorkerAdapter {
  constructor(private repository: WorkerRepositoryAdapter) {}

  public async execute(login: TLogin): Promise<TLoginResponse> {
    const finded = await this.repository.findOne({
      email: login.email.getValue(),
    });

    if (!finded) throw errorResponse('E-mail não cadastrado!', 422);

    const decrypt = new Decrypt(login.password.getValue());

    if (!decrypt.descrypted(finded.password))
      throw errorResponse('Senha incorreta!', 422);

    const token = JWT.generateToken(
      config.JWT.worker.access.secret,
      finded.id,
      {
        email: finded.email,
        name: finded.name,
      },
    );

    return {
      token,
      name: finded.name,
    };
  }
}
