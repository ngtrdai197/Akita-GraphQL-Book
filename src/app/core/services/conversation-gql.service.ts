import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { map } from 'rxjs/operators';

import * as conversationSubRef from '@graphql/conversation/conversation.subscription.graphql';
import * as conversationQueryRef from '@graphql/conversation/conversation.query.graphql';
import { IConversation, IMessageNode } from '@/shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ConversationGqlService {
  constructor(private apollo: Apollo) {}

  loadConversation({
    id,
    limit,
    skip
  }: {
    id: string;
    limit: number;
    skip: number;
  }) {
    return this.apollo
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
          return {
            conversationId: conversation.id,
            messages: conversation.messages.reverse()
          } as IMessageNode;
        })
      );
  }

  subscribeConversation(conversationId: string) {
    return this.apollo
      .subscribe({
        query: conversationSubRef.conversationSubscription,
        variables: {
          conversationId
        }
      })
      .pipe(map(({ data }) => data['newMessage']));
  }
}
