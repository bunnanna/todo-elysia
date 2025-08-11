import { t } from 'elysia';

export const createUserRequest = t.Object({
  username: t.String({ minLength: 1 }),
  password: t.String({ minLength: 8 }),
});

export type CreateUserRequest = typeof createUserRequest.static;
