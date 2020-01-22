import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BooksStore } from '@/containers/state/books.store';
import { tap } from 'rxjs/operators';
import { IBook } from '@/shared/interfaces/book.interface';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  constructor(private bookStore: BooksStore, private httpClient: HttpClient) {}

  getBooks() {
    this.httpClient
      .get<IBook[]>(`${environment.HOST}/${environment.BOOK}`)
      .pipe(tap(results => this.bookStore.set(results)))
      .subscribe();
  }

  updateBook(book: IBook) {
    this.httpClient
      .put<IBook>(
        `${environment.HOST}/${environment.BOOK}/update/${book.id}`,
        book,
      )
      .subscribe(_ => this.bookStore.update(book.id, { price: book.price }));
  }
}
