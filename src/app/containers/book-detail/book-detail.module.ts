import { NgModule } from '@angular/core';

import { BookDetailComponent } from './book-detail.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '@/shared/shared.module';

const routes: Routes = [
  { path: '', component: BookDetailComponent, data: { title: 'Book Detail' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes), SharedModule],
  exports: [],
  declarations: [BookDetailComponent],
  providers: [],
})
export class BookDetailModule {}
