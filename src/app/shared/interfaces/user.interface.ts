import { ID } from '@datorama/akita';

export interface IUser {
  id: ID;
  username: string;
  password: string;
  fullName: string;
  address?: string;
  roles: string[];
}

export enum ROLES {
  ADMIN = 'ADMIN',
  USER = 'USER',
}
