import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsComponent } from './posts.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '@/shared/shared.module';

const routes: Routes = [{ path: '', component: PostsComponent }];

@NgModule({
  declarations: [PostsComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule]
})
export class PostsModule {}
