import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';

import * as conversationSubRef from '@graphql/conversation/conversation.subscription.graphql';
import * as conversationQueryRef from '@graphql/conversation/conversation.query.graphql';
import { IConversation, IMessageNode } from '@/shared/interfaces';
import { MessageNodeStore } from '@/containers/conversation/state/message-node/message-node.store';

export type Paging = {
  id: string;
  limit: number;
  skip: number;
};

@Injectable({
  providedIn: 'root'
})
export class ConversationGqlService {
  constructor(
    private apollo: Apollo,
    private messageNodeStore: MessageNodeStore
  ) {}

  loadConversation({ id, limit, skip }: Paging) {
    this.apollo
      .watchQuery({
        query: conversationQueryRef.conversationByIdQuery,
        variables: {
          id,
          limit,
          skip
        }
      })
      .valueChanges.pipe(
        map(({ data }) => {
          const conversation = data['conversation'] as IConversation;
          const messageNode = {
            conversationId: conversation.id,
            messages: conversation.messages.reverse()
          } as IMessageNode;
          console.log('messageNode', messageNode);
          this.messageNodeStore.update(messageNode);
        })
      )
      .subscribe();
  }

  subscribeConversation(conversationId: string) {
    this.apollo
      .subscribe({
        query: conversationSubRef.conversationSubscription,
        variables: {
          conversationId
        }
      })
      .pipe(
        map(({ data }) => {
          const { message } = data['newMessage'];
          this.messageNodeStore.update(state => ({
            ...state,
            messages: [...state.messages, message]
          }));
        })
      )
      .subscribe();
  }
}
