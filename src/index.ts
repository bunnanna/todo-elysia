import swagger from '@elysiajs/swagger';
import Elysia from 'elysia';
import AuthController from './controllers/AuthController';
import { TodoController } from './controllers/TodoController';
import { UserController } from './controllers/UserController';

export const app = new Elysia()
  .use(swagger())
  .get('/', () => 'Hello Elysia')
  .use(AuthController)
  .use(UserController)
  .use(TodoController)
  .onStart(({ server }) => {
    console.log(`🦊 Elysia is running at ${server?.url}`);
  })
  .listen(8080);
