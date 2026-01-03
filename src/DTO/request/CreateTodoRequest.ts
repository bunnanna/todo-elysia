import type { TodoModel } from '../../models/TodoModel';

export type CreateTodoRequest = Pick<TodoModel, 'title' | 'description'>;
