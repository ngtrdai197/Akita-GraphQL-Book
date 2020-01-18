import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksComponent } from './books.component';
import { BookComponent } from './book/book.component';
import { Routes, RouterModule } from '@angular/router';

const COMPONENETS = [BooksComponent, BookComponent];

const routes: Routes = [{ path: '', component: BooksComponent }];

@NgModule({
  declarations: [COMPONENETS],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BooksModule {}
