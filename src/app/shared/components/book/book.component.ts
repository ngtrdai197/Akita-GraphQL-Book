import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IBook } from '@/shared/interfaces';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
})
export class BookComponent implements OnInit {
  @Input('book') book: IBook;

  constructor(private router: Router) {}

  ngOnInit() {}

  bookSelected(bookId: string) {
    this.router.navigate(['/book-detail', bookId]);
  }
}
