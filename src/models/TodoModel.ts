import { t } from 'elysia';
import type { UserModel } from './UserModel';

export const todoModel = t.Object({
  id: t.Numeric(),
  user_id: t.Numeric(),
  title: t.String({ minLength: 1 }),
  description: t.Optional(t.String()),
  completed: t.Numeric(),
  createdDatetime: t.Numeric(),
});

type UserInTodo = Pick<UserModel, 'id' | 'username'>;

export type TodoModel = typeof todoModel.static;
export type TodoModelWithUser = Omit<TodoModel, 'user_id'> & { user: UserInTodo };
export type CreateTodoModel = Pick<TodoModel, 'title' | 'description' | 'user_id'>;
