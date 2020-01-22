import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { BooksStore, BooksState } from './books.store';
import { IBook } from '../../shared/interfaces/book.interface';

@Injectable({ providedIn: 'root' })
export class BooksQuery extends QueryEntity<BooksState, IBook> {
  constructor(protected store: BooksStore) {
    super(store);
  }
}
