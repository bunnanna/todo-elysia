import Elysia, { t } from 'elysia';
import { createUserRequest } from '../DTO/request/CreateUserRequest';
import { type CreateUserModel } from '../models/UserModel';
import { JWTServicePlugin } from '../services/JWTServices';
import { userServicePlugin } from '../services/UserService';

const AuthController = new Elysia({
  name: 'AuthController',
  prefix: 'user',
})
  .use(JWTServicePlugin)
  .use(userServicePlugin)
  .post(
    '/sign-up',
    ({ createUser, body: { username, password } }) => {
      const createBody: CreateUserModel = {
        username,
        password: Bun.password.hashSync(password),
        name: username,
        createdDatetime: Date.now(),
      };
      return createUser(createBody);
    },
    {
      body: createUserRequest,
    },
  )
  .post(
    '/login',
    async ({ login, body: { username, password }, cookie: { token } }) => {
      token.value = await login({ username, password });
      return token.value;
    },
    {
      body: createUserRequest,
      cookie: 'authCookie',
    },
  )
  .get(
    '/',
    async ({ getMyData, auth }) => {
      return getMyData(auth.id);
    },
    {
      isAuth: true,
      response: t.Object({
        username: t.String(),
        name: t.String(),
        createdDatetime: t.Number(),
      }),
    },
  );
export default AuthController;
