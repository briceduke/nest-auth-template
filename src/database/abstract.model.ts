export class AbstractModel {
  constructor(private readonly _id: string) {}

  getId() {
    return this._id;
  }
}
