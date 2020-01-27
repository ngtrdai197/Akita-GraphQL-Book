import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./core/auth/auth.module').then(module => module.AuthModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./containers/books/books.module').then(
        module => module.BooksModule,
      ),
  },
  {
    path: 'book-detail/:bookId',
    loadChildren: () =>
      import('./containers/book-detail/book-detail.module').then(
        module => module.BookDetailModule,
      ),
  },
];
