import { Prisma } from '@prisma/client';
import { ID } from 'src/modules/entities/ID';
import { Worker } from '../entities/Worker';
import { TWorkerDatabase } from './types';

export abstract class WorkerRepositoryAdapter {
  public abstract show(companyId: ID): Promise<TWorkerDatabase[]>;
  public abstract findOne(
    companyId: ID,
    where: Prisma.WorkerWhereUniqueInput,
  ): Promise<TWorkerDatabase | null>;
  public abstract create(worker: Worker): Promise<TWorkerDatabase>;
  public abstract update(
    worker: Worker,
    workerId: ID,
  ): Promise<TWorkerDatabase>;
  public abstract delete(workerId: ID, companyId: ID): Promise<TWorkerDatabase>;
}
