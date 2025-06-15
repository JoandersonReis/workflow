import { Injectable } from '@nestjs/common';
import { Password } from 'src/modules/entities/Password';
import { Encrypt } from 'src/utils/Encrypt';
import { errorResponse } from 'src/utils/errorResponse';
import { CreateWorkerAdapter } from '../adpaters/CreateWorkerAdapter';
import { TWorkerDatabase } from '../adpaters/types';
import { WorkerRepositoryAdapter } from '../adpaters/WorkerRepositoryAdapter';
import { Worker } from '../entities/Worker';

@Injectable()
export class CreateWorkerCase implements CreateWorkerAdapter {
  constructor(private repository: WorkerRepositoryAdapter) {}

  public async execute(worker: Worker): Promise<TWorkerDatabase> {
    const findedWorker = await this.repository.findOne({
      email: worker.email,
    });

    if (findedWorker)
      throw errorResponse('Já existe usuário com esse email!', 422);

    const encrypt = new Encrypt(worker.password.getValue());

    worker.password = new Password(encrypt.encrypted);

    const newWorker = await this.repository.create(worker);

    return newWorker;
  }
}
