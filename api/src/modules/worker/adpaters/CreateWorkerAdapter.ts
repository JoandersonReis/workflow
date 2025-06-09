import { Worker } from '../entities/Worker';
import { TWorkerDatabase } from './types';

export abstract class CreateWorkerAdapter {
  public abstract execute(worker: Worker): Promise<TWorkerDatabase>;
}
