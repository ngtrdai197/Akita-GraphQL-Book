import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';

import * as postQueryRef from '@/graphql/post/post.query.graphql';
import * as postMutationyRef from '@/graphql/post/post.mutation.graphql';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PostGqlService {
  constructor(private apollo: Apollo) {}

  getPosts() {
    return this.apollo
      .watchQuery({
        query: postQueryRef.fetchPostsQuery
      })
      .valueChanges.pipe(map(({ data, loading }) => ({ data, loading })));
  }

  createNewPost() {
    return this.apollo
      .mutate({
        mutation: postMutationyRef.createPostMutation,
        variables: {
          name: 'Go lang',
          content:
            'Go is an open source programming language that makes it easy to build simple, reliable, and efficient software.'
        }
      })
      .pipe(map(({ data }) => ({ data })));
  }
}
