import Database from 'bun:sqlite';
import Elysia from 'elysia';
import dbPlugin from '../configs/db';
import { UserModel, type CreateUserModel } from '../models/UserModel';

export const userRepositoryPlugin = new Elysia({
  name: 'userRepository',
})
  .use(dbPlugin)
  .decorate(({ db }) => {
    return {
      userRepository: new UserRepository(db),
    };
  });

export class UserRepository {
  constructor(private _db: Database) {}

  create = (userModel: CreateUserModel) => {
    return this._db
      .query(
        `
  INSERT INTO user (username, password, name, createdDatetime)
  VALUES (:username, :password, :name, :createdDatetime);`,
      )
      .run(userModel);
  };

  getByUsername = (username: string) => {
    const user = this._db
      .query(
        `
  SELECT id, password FROM user WHERE username = :username;
  `,
      )
      .get({ username });
    if (!user) return null;
    return user as Pick<UserModel, 'id' | 'password'>;
  };

  getById = (id: string) => {
    const user = this._db
      .query(
        `
  SELECT * FROM user WHERE id = :id;
  `,
      )
      .get({ id });
    if (!user) return null;
    return user as UserModel;
  };
}
