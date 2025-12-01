import { t } from 'elysia';

export const authCookieModel = t.Cookie({
  token: t.Optional(t.String()),
});
