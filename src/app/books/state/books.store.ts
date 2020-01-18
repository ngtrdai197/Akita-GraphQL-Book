import { EntityStore, EntityState, StoreConfig } from '@datorama/akita';
import { Book } from './book.model';
import { Injectable } from '@angular/core';

export interface BooksState extends EntityState<Book> {}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'books' })
export class BooksStore extends EntityStore<BooksState, Book> {
  constructor() {
    super();
  }
}
