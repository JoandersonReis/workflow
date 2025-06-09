import { Injectable } from '@nestjs/common';
import { WorkerRepositoryPrisma } from 'src/database/prisma/worker/WorkerRepositoryPrisma';
import { errorResponse } from 'src/utils/errorResponse';
import { CreateWorkerAdapter } from '../adpaters/CreateWorkerAdapter';
import { TWorkerDatabase } from '../adpaters/types';
import { Worker } from '../entities/Worker';

@Injectable()
export class CreateWorkerCase implements CreateWorkerAdapter {
  constructor(private repository: WorkerRepositoryPrisma) {}

  public async execute(worker: Worker): Promise<TWorkerDatabase> {
    const findedWorker = await this.repository.findOne(worker.companyId, {
      email: worker.email,
    });

    if (findedWorker)
      throw errorResponse('Já existe usuário com esse email!', 422);

    const newWorker = await this.repository.create(worker);

    return newWorker;
  }
}
