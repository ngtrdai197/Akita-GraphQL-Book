import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./books/books.module').then(module => module.BooksModule),
  },
];
