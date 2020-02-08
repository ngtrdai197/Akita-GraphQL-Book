import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';

import * as messageMutationyRef from '@/graphql/message/message.mutation.graphql';

@Injectable({
  providedIn: 'root'
})
export class MessageGqlService {
  constructor(private apollo: Apollo) {}

  createNewMessage({
    content,
    conversationId
  }: {
    content: string;
    conversationId: string;
  }) {
    return this.apollo
      .mutate({
        mutation: messageMutationyRef.createMessageMutation,
        variables: {
          newMessage: {
            content
          },
          conversationId
        }
      })
      .subscribe();
  }
}
