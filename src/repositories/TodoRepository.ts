import type Database from 'bun:sqlite';
import type { CreateTodoModel, TodoModel, TodoModelWithUser } from '../models/TodoModel';
import type { UserModel } from '../models/UserModel';

export class TodoRepository {
  constructor(private db: Database) {}

  create = (todoModel: CreateTodoModel) => {
    return this.db
      .query(
        `
    INSERT INTO todo (title, description, completed, createdDatetime, user_id)
    VALUES (:username, :password, :name, :createdDatetime, :user_id);`,
      )
      .run(todoModel);
  };

  getById = (id: TodoModel['id']): TodoModelWithUser | null => {
    const todo = this.db
      .query(
        `
      SELECT
        id,
        title,
        description,
        completed,
        createdDatetime,
        u.id AS user_id,
        u.username as username,
      FROM todo t
      WHERE :id = id
      JOIN user u
      ON t.user_id = u.id
      `,
      )
      .get({ id });
    if (!todo) return null;
    const { user_id, username, ...rest } = todo as TodoModel & {
      user_id: UserModel['id'];
      username: UserModel['username'];
    };
    return { ...rest, user: { username, id: user_id } };
  };
}
