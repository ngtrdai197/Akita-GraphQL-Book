import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { WebSocketLink } from 'apollo-link-ws';

import { environment as env } from '@env/environment';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { LocalStorageService } from './core/services';

@NgModule({
  imports: [BrowserModule, ApolloModule, HttpLinkModule]
})
export class GraphqlModule {
  constructor(
    private apollo: Apollo,
    private httpLink: HttpLink,
    private localStorageService: LocalStorageService
  ) {
    const http = this.httpLink.create({
      uri: `${env.GRAPHQL}`
    });

    // Create a WebSocket link:
    const ws = new WebSocketLink({
      uri: `ws://localhost:3000/graphql`,
      options: {
        reconnect: true,
        connectionParams: () => ({
          Authorization: `Bearer ${this.localStorageService.getToken()}`
        })
      }
    });

    const link = split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === 'OperationDefinition' &&
          definition.operation === 'subscription'
        );
      },
      ws,
      http
    );
    this.apollo.create({
      link,
      cache: new InMemoryCache()
    });
  }
}
