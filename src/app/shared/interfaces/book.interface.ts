import { ID } from '@datorama/akita';

export interface IBook {
  id: ID;
  name: string;
  author: string;
  genres: string[];
  description: string;
  price: number;
}
