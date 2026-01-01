import Elysia from 'elysia';
import { userRepositoryPlugin } from '../repositories/UserRepository';
import { JWTServicePlugin } from './JWTServices';

export const AuthService = new Elysia()
  .use(userRepositoryPlugin)
  .use(JWTServicePlugin)
  .macro('isAuth', {
    cookie: 'authCookie',
    resolve: async ({ jwt, cookie: { token } }) => {
      const auth = (await jwt.verify(token.value)) as { id: string };
      if (!auth) throw new Error('Fbb');
      return { auth };
    },
  })
  .macro('authUser', {
    isAuth: true,
    resolve: async ({ auth, userRepository }) => {
      const authUser = userRepository.getById(auth.id);
      if (!authUser) throw new Error('user not found');
      return { authUser };
    },
  });
