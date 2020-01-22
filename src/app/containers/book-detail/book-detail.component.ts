import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BooksQuery } from '../state/books.query';
import { IBook } from '@/shared/interfaces';
import { BooksService } from '@/core/services';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss'],
})
export class BookDetailComponent implements OnInit {
  private bookId: string;
  public book: IBook;
  constructor(
    private activatedRoute: ActivatedRoute,
    private bookQuery: BooksQuery,
    private bookService: BooksService,
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.bookId = params.get('bookId');
      this.getBook();
    });
  }

  editBook(book?: IBook) {
    const newBook = book ? book : this.book;
    this.bookService.updateBook({ ...newBook, price: 40 });
    this.getBook();
  }

  private getBook() {
    this.book = this.bookQuery.getEntity(this.bookId);
    console.log('this.book', this.book);
  }
}
