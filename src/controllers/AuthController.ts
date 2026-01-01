import Elysia from 'elysia';
import { createUserRequest } from '../DTO/request/CreateUserRequest';
import { userResponse } from '../DTO/response/UserResponse';
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
      setCookie: true,
      body: createUserRequest,
    },
  )
  .get(
    '/',
    async ({ authUser }) => {
      return authUser;
    },
    {
      authUser: true,
      response: userResponse,
    },
  );
export default AuthController;
