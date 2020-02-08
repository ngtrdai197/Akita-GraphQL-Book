import { ID } from '@datorama/akita';
import { IUser } from './user.interface';
import { IMessage } from './message.interface';

export interface IConversation {
  id: ID;
  conversationId: string;
  name: string;
  participantIds: string[];
  participants: IUser[];
  messageIds: string[];
  messages: IMessage[];
}

export interface IMessageNode {
  conversationId: string;
  messages: Partial<IMessage[]>;
}
