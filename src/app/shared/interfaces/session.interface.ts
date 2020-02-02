import { IUser } from './user.interface';

export interface ISession {
  accessToken: string;
  user: Partial<IUser>;
}
