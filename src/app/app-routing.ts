import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

export const appRoutes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./core/auth/auth.module').then(module => module.AuthModule)
  },
  {
    path: '',
    loadChildren: () =>
      import('./containers/books/books.module').then(
        module => module.BooksModule
      )
  },
  {
    path: 'book-detail/:bookId',
    loadChildren: () =>
      import('./containers/book-detail/book-detail.module').then(
        module => module.BookDetailModule
      )
  },
  {
    path: 'conversation',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./containers/conversation/conversation.module').then(
        module => module.ConversationModule
      )
  },
  {
    path: 'posts',
    loadChildren: () =>
      import('./containers/posts/posts.module').then(
        module => module.PostsModule
      )
  }
];
