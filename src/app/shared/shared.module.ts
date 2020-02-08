import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import {
  FooterComponent,
  HeaderComponent,
  BookComponent,
  CreateBookComponent
} from './components';
import { CreatePostComponent } from './components/create-post/create-post.component';

const COMPONENETS = [
  FooterComponent,
  HeaderComponent,
  BookComponent,
  CreateBookComponent,
  CreatePostComponent
];

@NgModule({
  declarations: [...COMPONENETS],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  exports: [...COMPONENETS]
})
export class SharedModule {}
