import Elysia, { t } from 'elysia';
import { createUserRequest } from '../DTO/request/CreateUserRequest';
import { type CreateUserModel } from '../models/UserModel';
import { CookieServicePlugin } from '../services/CookieService';
import { JWTServicePlugin } from '../services/JWTServices';
import { userServicePlugin } from '../services/UserService';

const AuthController = new Elysia({
  name: 'AuthController',
  prefix: 'user',
})
  .use(JWTServicePlugin)
  .use(CookieServicePlugin)
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
    async ({ setAuthCookie, userService, body: { username, password } }) => {
      const token = await userService.login({ username, password });
      setAuthCookie(token);
      return token;
    },
    {
      body: createUserRequest,
      cookie: 'authCookie',
      setCookie: true,
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
