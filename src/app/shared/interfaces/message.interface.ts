import { ID } from '@datorama/akita';
import { IUser } from './user.interface';

export interface IMessage {
  id: ID;
  createdById: string;
  createdBy: IUser;
  content: string;
  isEdited: boolean;
  createdAt: Date;
  updatedAt: Date;
}
