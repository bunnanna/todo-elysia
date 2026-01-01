import Elysia from 'elysia';
import { authCookieModel } from '../DTO/request/AuthCookie';

export const CookieServicePlugin = new Elysia().model('authCookie', authCookieModel).macro('setCookie', {
  cookie: 'authCookie',
  resolve: ({ cookie }) => {
    const setAuthCookie = (value: string) => {
      cookie.token.value = value;
    };
    return { setAuthCookie };
  },
});
