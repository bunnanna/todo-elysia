import Elysia from 'elysia';
import { userRepositoryPlugin } from '../repositories/UserRepository';

export const AuthService = new Elysia().use(userRepositoryPlugin);
