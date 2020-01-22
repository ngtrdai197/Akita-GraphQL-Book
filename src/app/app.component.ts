import { Component, OnInit } from '@angular/core';
import { BooksService } from './core/services';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'my-app';
  constructor(private booksService: BooksService) {}
  ngOnInit() {
    this.getBooks();
  }

  private getBooks() {
    this.booksService.getBooks();
  }
}
