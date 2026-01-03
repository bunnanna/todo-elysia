import { t } from 'elysia';

export const createTodoRequest = t.Object({
  title: t.String({ minLength: 1 }),
  description: t.Optional(t.String()),
});

export type CreateTodoRequest = typeof createTodoRequest.static;
