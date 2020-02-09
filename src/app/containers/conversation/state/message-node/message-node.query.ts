import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { MessageNodeState, MessageNodeStore } from './message-node.store';

@Injectable({ providedIn: 'root' })
export class MessageNodeQuery extends Query<MessageNodeState> {
  constructor(protected store: MessageNodeStore) {
    super(store);
  }
}
