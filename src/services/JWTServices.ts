import jwt from '@elysiajs/jwt';
import Elysia from 'elysia';
import { CookieServicePlugin } from './CookieService';

export const JWTServicePlugin = new Elysia()
  .use(CookieServicePlugin)
  .use(
    jwt({
      name: 'jwt',
      secret: '123456',
    }),
  )
  .macro('isAuth', {
    cookie: 'authCookie',
    resolve: async ({ jwt, cookie: { token } }) => {
      const auth = (await jwt.verify(token.value)) as { id: string };
      if (!auth) throw new Error('Fbb');
      return { auth };
    },
  });

export type JWTService = (typeof JWTServicePlugin)['decorator']['jwt'];
