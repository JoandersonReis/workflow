import { TPagination } from './types';

export class BaseRepository {
  constructor(protected connection: any) {}

  async show<T>(
    where?: T,
    select?: any,
    options: any = {
      orderBy: {
        created_at: 'desc',
      },
    },
    pagination: TPagination = {
      limit: 0,
      page: 0,
    },
  ) {
    const skip = (pagination.page - 1) * pagination.limit;

    const result = await this.connection.findMany({
      where,
      select,
      skip,
      take: pagination.limit !== 0 ? pagination.limit : undefined,
      ...options,
    });

    return result;
  }

  async create<T>(data: T[]) {
    const result = await this.connection.createMany({
      data,
    });

    return result;
  }

  async getOne<T>(where: T) {
    const result = await this.connection.findFirst({
      where,
    });

    return result;
  }

  async update<T>(where: T, data: any) {
    const result = await this.connection.update({
      where,
      data,
    });

    return result;
  }

  async delete<T>(where: T) {
    const result = await this.connection.delete({
      where,
    });

    return result;
  }

  async count<T>(where?: T): Promise<number> {
    const result = await this.connection.count({
      where,
    });

    return result;
  }
}
