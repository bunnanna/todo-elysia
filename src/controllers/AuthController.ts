import Elysia, { t } from 'elysia';
import { createUserRequest } from '../DTO/request/CreateUserRequest';
import { AuthService } from '../services/AuthService';
import { CookieServicePlugin } from '../services/CookieService';
import { userServicePlugin } from '../services/UserService';

const AuthController = new Elysia({
  name: 'AuthController',
  prefix: 'user',
})
  .use(AuthService)
  .use(CookieServicePlugin)
  .use(userServicePlugin)
  .post(
    '/sign-up',
    ({ userService, body: { username, password } }) => {
      return userService.createUser({ username, password });
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
    async ({ authUser }) => {
      return authUser;
    },
    {
      authUser: true,
      response: t.Object({
        username: t.String(),
        name: t.String(),
        createdDatetime: t.Number(),
      }),
    },
  );
export default AuthController;
