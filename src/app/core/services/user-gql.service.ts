import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';

import * as userQueryRef from '@/graphql/user/user.query.graphql';

@Injectable({ providedIn: 'root' })
export class UserGqlService {
  constructor(private apollo: Apollo) {}

  public me() {
    return this.apollo
      .watchQuery({
        query: userQueryRef.meQuery
      })
      .valueChanges.pipe(map(({ data, loading }) => ({ data, loading })));
  }
}
