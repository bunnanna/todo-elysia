import { t } from 'elysia';
import { userResponse } from './UserResponse';

export const todoResponse = t.Object({
  id: t.Numeric(),
  user_id: t.Numeric(),
  title: t.String({ minLength: 1 }),
  description: t.Optional(t.String()),
  completed: t.Numeric(),
  createdDatetime: t.Numeric(),
});

export const todoResponseWithUser = t.Object({
  id: t.Numeric(),
  user: t.Partial(userResponse),
  title: t.String({ minLength: 1 }),
  description: t.Optional(t.String()),
  completed: t.Numeric(),
  createdDatetime: t.Numeric(),
});
