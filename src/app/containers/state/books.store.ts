import { EntityStore, EntityState, StoreConfig } from '@datorama/akita';
import { IBook } from '../../shared/interfaces/book.interface';
import { Injectable } from '@angular/core';
import { CONSTANTS } from '../../core/constants';

export interface BooksState extends EntityState<IBook> {}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: CONSTANTS.BOOK_STORE })
export class BooksStore extends EntityStore<BooksState, IBook> {
  constructor() {
    super();
  }
}
