import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConversationComponent } from './conversation.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: ConversationComponent }];

@NgModule({
  declarations: [ConversationComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class ConversationModule {}
