import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/PrismaService';
import { ID } from 'src/modules/entities/ID';
import { WorkerRepositoryAdapter } from 'src/modules/worker/adpaters/WorkerRepositoryAdapter';
import { TWorkerDatabase } from 'src/modules/worker/adpaters/types';
import { Worker } from '../../../modules/worker/entities/Worker';

@Injectable()
export class WorkerRepositoryPrisma implements WorkerRepositoryAdapter {
  constructor(private prisma: PrismaService) {}

  async show(companyId: ID) {
    const workers = await this.prisma.worker.findMany({
      where: {
        companyId: companyId.getValue(),
      },
    });

    return workers;
  }

  async findOne(
    companyId: ID,
    where: Prisma.WorkerWhereUniqueInput,
  ): Promise<TWorkerDatabase | null> {
    const worker = await this.prisma.worker.findUnique({
      where: {
        companyId: companyId.getValue(),
        ...where,
      },
    });

    return worker;
  }

  async create(worker: Worker): Promise<TWorkerDatabase> {
    console.log(worker.getValues());

    const newWorker = await this.prisma.worker.create({
      data: worker.getValues(),
    });

    return newWorker;
  }

  async update(worker: Worker, workerId: ID) {
    const updatedWorker = await this.prisma.worker.update({
      data: worker.getValues(),
      where: {
        id: workerId.getValue(),
      },
    });

    return updatedWorker;
  }

  async delete(workerId: ID, companyId: ID) {
    const deletedWorker = await this.prisma.worker.delete({
      where: {
        companyId: companyId.getValue(),
        id: workerId.getValue(),
      },
    });

    return deletedWorker;
  }
}
