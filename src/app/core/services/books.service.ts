import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BooksStore } from '@/containers/books/state/books.store';
import { tap, timeout, catchError } from 'rxjs/operators';
import { IBook } from '@/shared/interfaces/book.interface';
import { Observable, throwError } from 'rxjs';
import { setLoading } from '@datorama/akita';
import { environment as env } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  constructor(private bookStore: BooksStore, private httpClient: HttpClient) {}

  getBooks() {
    this.httpClient
      .get<IBook[]>(`${env.HOST}/${env.BOOK}`)
      .pipe(
        timeout(3000),
        setLoading(this.bookStore),
        tap(books => this.bookStore.set(books)),
      )
      .subscribe();
  }

  updateBook(book: IBook): Observable<IBook> {
    return this.httpClient
      .put<IBook>(`${env.HOST}/${env.BOOK}/update/${book.id}`, book)
      .pipe(
        tap(this.bookStore.update(book.id, { price: book.price })),
        catchError(err => {
          console.error(err.error);
          return throwError(err.error);
        }),
      );
  }

  createBook(newBook: IBook) {
    this.httpClient
      .post<IBook>(`${env.HOST}/${env.BOOK}`, newBook)
      .pipe(
        tap(book => this.bookStore.add(book)),
        catchError(err => {
          console.error(err.error);
          return throwError(err.error);
        }),
      )
      .subscribe();
  }
}
