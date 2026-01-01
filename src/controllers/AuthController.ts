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
    ({ userService, body: { username, password } }) => {
      const createBody: CreateUserModel = {
        username,
        password: Bun.password.hashSync(password),
        name: username,
        createdDatetime: Date.now(),
      };
      return userService.createUser(createBody);
    },
    {
      body: createUserRequest,
    },
  )
  .post(
    '/login',
    async ({ userService, body: { username, password }, cookie: { token } }) => {
      token.value = await userService.login({ username, password });
      return token.value;
    },
    {
      body: createUserRequest,
      cookie: 'authCookie',
    },
  )
  .get(
    '/',
    async ({ userService, auth }) => {
      return userService.getMyData(auth.id);
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
