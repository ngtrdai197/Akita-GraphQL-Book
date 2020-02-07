import { Injectable } from '@angular/core';
import { ConversationStore, ConversationState } from '././conversation.store';
import { Query } from '@datorama/akita';

@Injectable({ providedIn: 'root' })
export class ConversationQuery extends Query<ConversationState> {
  constructor(protected store: ConversationStore) {
    super(store);
  }
}
