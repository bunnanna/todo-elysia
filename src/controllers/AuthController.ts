import jwt from '@elysiajs/jwt';
import Elysia, { t } from 'elysia';
import db from '../configs/db';
import { createUserRequest } from '../DTO/request/CreateUserRequest';
import { UserModel } from '../models/UserModel';
import { UserRepository } from '../repositories/UserRepository';

const authCookieModel = t.Cookie({
  auth: t.Optional(t.String()),
});

const AuthController = new Elysia({
  name: 'AuthController',
  prefix: 'user',
})
  .use(
    jwt({
      name: 'jwt',
      secret: '123456',
    }),
  )
  .model('authCookie', authCookieModel)
  .decorate('userRepository', new UserRepository(db))
  .post(
    '/sign-up',
    ({ userRepository, body: { username, password } }) => {
      const createBody: Omit<UserModel, 'id'> = {
        username,
        password: Bun.password.hashSync(password),
        name: username,
        createdDatetime: Date.now(),
      };
      return userRepository.create(createBody);
    },
    {
      body: createUserRequest,
    },
  )
  .post(
    '/login',
    async ({ jwt, userRepository, body: { username, password }, cookie: { auth } }) => {
      const user = userRepository.getByUsername(username);
      if (!Bun.password.verifySync(password, user.password)) throw new Error('Invalid');
      auth.value = await jwt.sign({ id: `${user.id}` });
      return auth.value;
    },
    {
      body: createUserRequest,
      cookie: 'authCookie',
    },
  )
  .get(
    '/',
    async ({ jwt, userRepository, cookie: { auth } }) => {
      const unsign = await jwt.verify(auth.value);
      if (!unsign) throw new Error('Fbb');
      const { username, name, createdDatetime } = userRepository.getById(unsign.id as string);
      return { username, name, createdDatetime };
    },
    {
      cookie: 'authCookie',
      response: t.Object({
        username: t.String(),
        name: t.String(),
        createdDatetime: t.Number(),
      }),
    },
  );
export default AuthController;
