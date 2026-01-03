import Elysia, { t } from 'elysia';
import { createTodoRequest } from '../DTO/request/CreateTodoRequest';
import { todoResponse, todoResponseWithUser } from '../DTO/response/TodoResponse';
import { AuthService } from '../services/AuthService';
import { todoServicePlugin } from '../services/TodoService';

export const TodoController = new Elysia({ name: 'todoController', prefix: 'todo' })
  .use(AuthService)
  .use(todoServicePlugin)
  .post(
    '/',
    async ({ todoService, authUser, body }) => {
      return await todoService.createTodo(body, authUser);
    },
    {
      authUser: true,
      body: createTodoRequest,
      response: todoResponse,
    },
  )
  .get(
    '/:id',
    async ({ params: { id }, todoService }) => {
      return await todoService.getTodoById(id);
    },
    {
      params: t.Object({ id: t.Number() }),
      response: todoResponseWithUser,
    },
  );
