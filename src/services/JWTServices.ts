import jwt from '@elysiajs/jwt';
import Elysia from 'elysia';
import { CookieServicePlugin } from './CookieService';

export const JWTServicePlugin = new Elysia().use(CookieServicePlugin).use(
  jwt({
    name: 'jwt',
    secret: '123456',
  }),
);

export type JWTService = (typeof JWTServicePlugin)['decorator']['jwt'];
