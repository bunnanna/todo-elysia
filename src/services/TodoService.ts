import Elysia from 'elysia';
import type { CreateTodoRequest } from '../DTO/request/CreateTodoRequest';
import type { CreateTodoModel } from '../models/TodoModel';
import type { UserModel } from '../models/UserModel';
import { todoRepositoryPlugin, type TodoRepository } from '../repositories/TodoRepository';

export const todoServicePlugin = new Elysia({ name: 'todoServicePlugin' })
  .use(todoRepositoryPlugin)
  .decorate(({ todoRepository }) => ({ todoService: new TodoService(todoRepository) }));

export class TodoService {
  constructor(private todoRepository: TodoRepository) {}

  createTodo = async (body: CreateTodoRequest, authUser: UserModel) => {
    const todoModel: CreateTodoModel = {
      title: body.title,
      description: body.description,
      completed: 0,
      createdDatetime: Date.now(),
      user_id: authUser.id,
    };
    const id = (await this.todoRepository.create(todoModel)) as number;
    return {
      ...todoModel,
      id,
    };
  };

  getTodoById = async (id: number) => {
    const todo = await this.todoRepository.getByIdWithUser(id);
    if (!todo) throw new Error('Not found');
    return todo;
  };
}
