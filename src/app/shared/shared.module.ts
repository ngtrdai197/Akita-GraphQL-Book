import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent, HeaderComponent, BookComponent } from './components';

const COMPONENETS = [FooterComponent, HeaderComponent, BookComponent];

@NgModule({
  declarations: [...COMPONENETS],
  imports: [CommonModule],
  exports: [...COMPONENETS],
})
export class SharedModule {}
