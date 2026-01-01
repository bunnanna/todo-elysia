import Elysia from 'elysia';
import { createUserRequest } from '../DTO/request/CreateUserRequest';
import { userResponse } from '../DTO/response/UserResponse';
import { AuthService } from '../services/AuthService';
import { userServicePlugin } from '../services/UserService';

export const UserController = new Elysia({ name: 'UserController', prefix: 'user' })
  .use(AuthService)
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
