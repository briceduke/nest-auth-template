export class UserModel {
  constructor(
    private readonly _id: string,
    private readonly username: string,
    private readonly email: string,
    private readonly password?: string,
  ) {}

  getId(): string {
    return this._id;
  }

  getUsername(): string {
    return this.username;
  }

  getEmail(): string {
    return this.email;
  }

  getPassword(): string {
    return this.password;
  }
}
