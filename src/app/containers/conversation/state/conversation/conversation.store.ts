import { StoreConfig, Store } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { IConversation } from '@/shared/interfaces';
import { CONSTANTS } from '@/core/constants';

export interface ConversationState {
  conversation: Partial<IConversation>;
  conversations: Partial<IConversation[]>;
}

const createInitialState = (): ConversationState => ({
  conversation: null,
  conversations: []
});

@Injectable({
  providedIn: 'root'
})
@StoreConfig({ name: CONSTANTS.CONVERSATION_STORE })
export class ConversationStore extends Store<ConversationState> {
  constructor() {
    super(createInitialState());
  }
}
