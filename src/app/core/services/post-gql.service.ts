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
      .valueChanges.pipe(
        map(({ data, loading }) => {
          return { data, loading };
        })
      );
  }

  createNewPost({ name, content }: { name: string; content: string }) {
    return this.apollo
      .mutate({
        mutation: postMutationyRef.createPostMutation,
        variables: {
          name,
          content
        }
      })
      .pipe(map(({ data }) => ({ data })));
  }

  getCacheApollo() {
    return this.apollo.getClient().readQuery({
      query: postQueryRef.fetchPostsQuery
    });
  }
}
