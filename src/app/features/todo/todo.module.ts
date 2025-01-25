import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoPageComponent } from './todo-page.component';
import { TodoCreateComponent } from './todo-create/todo-create.component';
import { TodoShowComponent } from './todo-show/todo-show.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TodoEditComponent } from './todo-edit/todo-edit.component';

@NgModule({
  declarations: [
    TodoPageComponent,
    TodoCreateComponent,
    TodoShowComponent,
    TodoEditComponent,
  ],
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
})
export class TodoModule {}
