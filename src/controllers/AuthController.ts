import Elysia from 'elysia';
import { createUserRequest } from '../DTO/request/CreateUserRequest';
import { CookieServicePlugin } from '../services/CookieService';
import { userServicePlugin } from '../services/UserService';

const AuthController = new Elysia({
  name: 'AuthController',
  prefix: 'auth',
})
  .use(CookieServicePlugin)
  .use(userServicePlugin)
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
  );
export default AuthController;
