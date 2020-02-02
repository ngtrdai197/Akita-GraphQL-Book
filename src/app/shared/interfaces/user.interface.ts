import { ID } from '@datorama/akita';

export interface IUser {
  id: ID;
  username: string;
  password: string;
  fullName: string;
  address?: string;
  roles: ROLES[];
}

export const enum ROLES {
  ADMIN = 'ADMIN',
  USER = 'USER',
}
