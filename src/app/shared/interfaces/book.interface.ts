import { ID } from '@datorama/akita';
import { IUser } from './user.interface';

export interface IBook {
  id: ID;
  name: string;
  author: string;
  genres: string[];
  description: string;
  price: number;
  createdById: string;
  createdBy?: IUser;
}
