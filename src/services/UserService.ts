import Elysia from 'elysia';
import type { LoginModel } from '../models/LoginModel';
import type { CreateUserModel } from '../models/UserModel';
import { userRepositoryPlugin } from '../repositories/UserRepository';
import { JWTServicePlugin } from './JWTServices';

export const userServicePlugin = new Elysia()
  .use(userRepositoryPlugin)
  .use(JWTServicePlugin)
  .decorate(({ jwt, userRepository }) => ({
    async createUser(body: CreateUserModel) {
      if (userRepository.getByUsername(body.username)) throw new Error('dup user');
      userRepository.create(body);
      return body;
    },
    async login({ username, password }: LoginModel) {
      const user = userRepository.getByUsername(username);
      if (!user) throw new Error('Invalid');
      if (!Bun.password.verifySync(password, user.password)) throw new Error('Invalid');
      return jwt.sign({ id: `${user.id}` });
    },
    async getMyData(id: string) {
      const user = userRepository.getById(id);
      if (!user) throw new Error('user not found');
      const { username, name, createdDatetime } = user;
      return { username, name, createdDatetime };
    },
  }));
