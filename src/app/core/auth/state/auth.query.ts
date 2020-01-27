import { Injectable } from '@angular/core';
import { SessionState, AuthStore } from './auth.store';
import { Query } from '@datorama/akita';

@Injectable({ providedIn: 'root' })
export class AuthQuery extends Query<SessionState> {
  constructor(protected store: AuthStore) {
    super(store);
  }
}
