import Database from 'bun:sqlite';
import Elysia from 'elysia';
import dbPlugin from '../configs/db';
import { UserModel } from '../models/UserModel';

export const userRepository = new Elysia({
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

  create = (userModel: Omit<UserModel, 'id'>) => {
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
    if (!user) throw new Error('Not found');
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
    if (!user) throw new Error('Not found');
    return user as UserModel;
  };
}
