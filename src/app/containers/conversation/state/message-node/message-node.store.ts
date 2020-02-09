import { StoreConfig, Store } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { IMessage } from '@/shared/interfaces';
import { CONSTANTS } from '@/core/constants';

export interface MessageNodeState {
  conversationId: string;
  messages: Partial<IMessage[]>;
}

const createInitialState = (): MessageNodeState => ({
  conversationId: '',
  messages: []
});

@Injectable({
  providedIn: 'root'
})
@StoreConfig({ name: CONSTANTS.MESSAGE_NODE_STORE })
export class MessageNodeStore extends Store<MessageNodeState> {
  constructor() {
    super(createInitialState());
  }
}
