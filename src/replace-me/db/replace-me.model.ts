import { AbstractModel } from '../../database/abstract.model';

export class ReplaceMeCapsModel extends AbstractModel {
  constructor(
    private readonly name: string,
    private readonly list: string[],
    _id: string,
  ) {
    super(_id);
  }

  getName(): string {
    return this.name;
  }

  getList(): string[] {
    return [...this.list];
  }
}
