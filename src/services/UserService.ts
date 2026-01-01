import Elysia from 'elysia';
import type { CreateUserRequest } from '../DTO/request/CreateUserRequest';
import type { LoginModel } from '../models/LoginModel';
import type { CreateUserModel } from '../models/UserModel';
import { userRepositoryPlugin, type UserRepository } from '../repositories/UserRepository';
import { JWTServicePlugin, type JWTService } from './JWTServices';

export const userServicePlugin = new Elysia()
  .use(userRepositoryPlugin)
  .use(JWTServicePlugin)
  .decorate(({ jwt, userRepository }) => ({
    userService: new UserService(userRepository, jwt),
  }));

export class UserService {
  constructor(private userRepository: UserRepository, private jwtClient: JWTService) {}

  createUser = async ({ username, password }: CreateUserRequest) => {
    const body: CreateUserModel = {
      username,
      password: Bun.password.hashSync(password),
      name: username,
      createdDatetime: Date.now(),
    };
    if (this.userRepository.getByUsername(body.username)) throw new Error('dup user');
    this.userRepository.create(body);
    return body;
  };

  login = async ({ username, password }: LoginModel) => {
    const user = this.userRepository.getByUsername(username);
    if (!user) throw new Error('Invalid');
    if (!Bun.password.verifySync(password, user.password)) throw new Error('Invalid');
    return this.jwtClient.sign({ id: `${user.id}` });
  };
}
