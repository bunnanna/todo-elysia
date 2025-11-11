import { t } from 'elysia';

export const authCookieModel = t.Cookie({
  auth: t.Optional(t.String()),
});
