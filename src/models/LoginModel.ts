import { t } from 'elysia';

const loginModel = t.Object({
  username: t.String(),
  password: t.String(),
});

export type LoginModel = typeof loginModel.static;
