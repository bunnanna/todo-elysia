import swagger from '@elysiajs/swagger';
import Elysia from 'elysia';
import AuthController from './controllers/AuthController';

export const app = new Elysia()
  .use(swagger())
  .get('/', () => 'Hello Elysia')
  .use(AuthController)
  .onStart(({ server }) => {
    console.log(`🦊 Elysia is running at ${server?.url}`);
  })
  .listen(3000);
