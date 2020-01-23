import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import {
  FooterComponent,
  HeaderComponent,
  BookComponent,
  CreateBookComponent,
} from './components';

const COMPONENETS = [
  FooterComponent,
  HeaderComponent,
  BookComponent,
  CreateBookComponent,
];

@NgModule({
  declarations: [...COMPONENETS],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [...COMPONENETS],
})
export class SharedModule {}
