import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksComponent } from './books.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

const COMPONENETS = [BooksComponent];

const routes: Routes = [
  { path: '', component: BooksComponent, data: { title: 'List Book' } },
];

@NgModule({
  declarations: [COMPONENETS],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
  exports: [RouterModule],
})
export class BooksModule {}
