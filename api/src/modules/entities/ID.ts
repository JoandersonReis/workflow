import { errorResponse } from 'src/utils/errorResponse';

export class ID {
  private id: string;

  constructor(id: string) {
    this.validate(id);

    this.id = id;
  }

  private validate(value: string) {
    const regex =
      /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/;

    if (!regex.test(value)) {
      throw errorResponse('ID Precisa ser formato UUID!', 422);
    }
  }

  public getValue(): string {
    return this.id;
  }
}
