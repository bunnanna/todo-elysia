import jwt from '@elysiajs/jwt';
import Elysia from 'elysia';
import { authCookieModel } from '../DTO/request/AuthCookie';

export const JWTServicePlugin = new Elysia()
  .use(
    jwt({
      name: 'jwt',
      secret: '123456',
    }),
  )
  .model('authCookie', authCookieModel)
  .macro('isAuth', {
    cookie: 'authCookie',
    resolve: async ({ jwt, cookie: { token } }) => {
      const auth = (await jwt.verify(token.value)) as { id: string };
      if (!auth) throw new Error('Fbb');
      return { auth };
    },
  });
