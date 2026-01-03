import type Database from 'bun:sqlite';
import Elysia from 'elysia';
import dbPlugin from '../configs/db';
import type { CreateTodoModel, TodoModel, TodoModelWithUser } from '../models/TodoModel';
import type { UserModel } from '../models/UserModel';

export const todoRepositoryPlugin = new Elysia({
  name: 'todoRepository',
})
  .use(dbPlugin)
  .decorate(({ db }) => ({
    todoRepository: new TodoRepository(db),
  }));

export class TodoRepository {
  constructor(private db: Database) {}

  create = async (todoModel: CreateTodoModel) => {
    const result = this.db
      .query(
        `
    INSERT INTO todo (title, description, completed, createdDatetime, user_id)
    VALUES (:title, :description, :completed, :createdDatetime, :user_id);`,
      )
      .run(todoModel);

    return result.lastInsertRowid;
  };

  getByIdWithUser = async (id: TodoModel['id']): Promise<TodoModelWithUser | null> => {
    const todo = this.db
      .query<TodoQueryResult, { id: number }>(
        `
        SELECT
          t.id,
          t.title,
          t.description,
          t.completed,
          t.createdDatetime,
          u.id AS user_id,
          u.username AS username
        FROM todo t
        JOIN user u
          ON t.user_id = u.id
        WHERE t.id = :id;
      `,
      )
      .get({ id });
    if (!todo) return null;
    const { user_id, username, ...rest } = todo;
    return { ...rest, user: { username, id: user_id } };
  };
}

type TodoQueryResult = TodoModel & {
  user_id: UserModel['id'];
  username: UserModel['username'];
};
