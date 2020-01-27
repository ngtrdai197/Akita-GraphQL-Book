import { StoreConfig, Store } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { IUser } from '@/shared/interfaces';
import { CONSTANTS } from '@/core/constants';

export interface SessionState {
  me: IUser;
  accessToken: string;
}

export const createInitialState = (): SessionState => ({
  me: null,
  accessToken: '',
});

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: CONSTANTS.AUTH_STORE })
export class AuthStore extends Store<SessionState> {
  constructor() {
    super(createInitialState());
  }
}
