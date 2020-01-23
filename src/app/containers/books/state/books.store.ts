import { EntityStore, EntityState, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { IBook } from '@/shared/interfaces';
import { CONSTANTS } from '@/core/constants';

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
