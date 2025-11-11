import { t } from 'elysia';

export const userModel = t.Object({
  id: t.Number(),
  username: t.String({ minLength: 1 }),
  password: t.String({ minLength: 8 }),
  name: t.String(),
  createdDatetime: t.Number(),
});

export type UserModel = typeof userModel.static;
export type CreateUserModel = Omit<UserModel, 'id'>;
