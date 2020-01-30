import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QueryEntity, Order } from '@datorama/akita';
import { BooksStore, BooksState } from './books.store';
import { IBook } from '@/shared/interfaces';

@Injectable({ providedIn: 'root' })
export class BooksQuery extends QueryEntity<BooksState, IBook> {
  constructor(protected store: BooksStore) {
    super(store);
  }

  getBookByName(bookName: string): Observable<IBook[]> {
    return this.selectAll({
      filterBy: entity =>
        entity.name.toLowerCase().includes(bookName.toLowerCase()),
      sortBy: 'name',
      sortByOrder: Order.ASC,
    });
  }
}
