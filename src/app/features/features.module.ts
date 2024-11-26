import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthModule } from './auth/auth.module';
import { TodoModule } from './todo/todo.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, AuthModule, TodoModule],
  exports: [AuthModule],
})
export class FeaturesModule {}
