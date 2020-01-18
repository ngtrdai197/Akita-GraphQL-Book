import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from './state/book.model';
import { BooksService } from './state/books.service';
import { BooksQuery } from './state/books.query';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements OnInit {
  books$: Observable<Book[]>;
  private selectLoading$: Observable<boolean>;
  constructor(
    private readonly booksService: BooksService,
    private readonly booksQuery: BooksQuery,
  ) {}

  ngOnInit() {
    this.books$ = this.booksQuery.selectAll();
    this.selectLoading$ = this.booksQuery.selectLoading();
  }

  public getBooks() {
    this.booksService.getBooks();
  }
}
