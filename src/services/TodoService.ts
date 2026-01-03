import type { CreateTodoModel } from '../models/TodoModel';
import type { UserModel } from '../models/UserModel';
import type { TodoRepository } from '../repositories/TodoRepository';

export class TodoService {
  constructor(private todoRepository: TodoRepository) {}

  createTodo = async (body: CreateTodoModel, authUser: UserModel) => {
    const todoModel: CreateTodoModel = {
      title: body.title,
      description: body.description,
      completed: 0,
      createdDatetime: Date.now(),
      user_id: authUser.id,
    };
    const id = await this.todoRepository.create(todoModel);
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
