import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConversationComponent } from './conversation.component';
import { Routes, RouterModule } from '@angular/router';
import { CreateMessageComponent } from './create-message/create-message.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [{ path: ':id', component: ConversationComponent }];

const COMPONENTS = [ConversationComponent, CreateMessageComponent];
@NgModule({
  declarations: [...COMPONENTS],
  imports: [CommonModule, RouterModule.forChild(routes), FormsModule]
})
export class ConversationModule {}
