import { Component, OnInit } from '@angular/core';
import { BooksService, AuthService } from './core/services';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'my-app';
  constructor(
    private booksService: BooksService,
    private authService: AuthService,
  ) {}
  ngOnInit() {
    this.getBooks();
    this.me();
  }

  private getBooks() {
    this.booksService.getBooks();
  }
  private me() {
    this.authService.me().subscribe();
  }
}
