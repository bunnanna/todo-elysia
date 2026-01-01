import { t } from 'elysia';

export const userResponse = t.Object({
  username: t.String(),
  name: t.String(),
  createdDatetime: t.Number(),
});

export type UserResponse = typeof userResponse.static;
