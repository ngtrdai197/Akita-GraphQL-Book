import { Component, OnInit, Input } from '@angular/core';
import { IBook } from '../../interfaces/book.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
})
export class BookComponent implements OnInit {
  // tslint:disable-next-line: no-input-rename
  @Input('book') book: IBook;

  constructor(private router: Router) {}

  ngOnInit() {}

  bookSelected(bookId: string) {
    this.router.navigate(['/book-detail', bookId]);
  }
}
