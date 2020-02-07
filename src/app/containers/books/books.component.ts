import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IBook } from '@/shared/interfaces';
import { BooksQuery } from './state/books.query';
import { Order } from '@datorama/akita';
import { UserGqlService, PostGqlService } from '@/core/services';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {
  books$: Observable<IBook[]>;
  book$: Observable<IBook>;
  private selectLoading$: Observable<boolean>;
  constructor(
    private readonly booksQuery: BooksQuery,
    private userGqlService: UserGqlService,
    private postGqlService: PostGqlService
  ) {}

  ngOnInit() {
    this.books$ = this.booksQuery.selectAll({
      sortBy: 'name',
      sortByOrder: Order.ASC
    });
    this.selectLoading$ = this.booksQuery.selectLoading();
    this.userGqlService.me().subscribe(({ data, loading }) => {
      console.log('me: ', data);
      console.log('loading', loading);
    });
    this.postGqlService.getPosts().subscribe(({ data, loading }) => {
      console.log('posts: ', data);
      console.log('loading', loading);
    });
  }

  getBook(name: string) {
    this.books$ = this.booksQuery.getBookByName(name);
  }
}
