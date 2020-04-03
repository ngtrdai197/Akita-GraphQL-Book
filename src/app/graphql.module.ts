import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { WebSocketLink } from 'apollo-link-ws';
import { onError } from 'apollo-link-error';
import { ServerError } from 'apollo-link-http-common';

import { environment as env } from '@env/environment';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { LocalStorageService, AuthService } from './core/services';

@NgModule({
  imports: [BrowserModule, ApolloModule, HttpLinkModule]
})
export class GraphqlModule {
  constructor(
    private apollo: Apollo,
    private httpLink: HttpLink,
    private localStorageService: LocalStorageService,
    private authService: AuthService
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
    const logoutLink = onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) => {
          console.log(
            `[GraphQL Error]: message:  ${message} - Location: ${locations} - Path: ${path}`
          );
        });
      }
      if ((networkError as ServerError).statusCode === 401) {
        this.authService.logout();
      }
    });
    this.apollo.create({
      link: logoutLink.concat(link),
      cache: new InMemoryCache()
    });
  }
}
