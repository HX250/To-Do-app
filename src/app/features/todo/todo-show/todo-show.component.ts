import { Component } from '@angular/core';
import { task } from '../models/task.model';

@Component({
  selector: 'app-todo-show',
  templateUrl: './todo-show.component.html',
  styleUrls: ['./todo-show.component.css'],
})
export class TodoShowComponent {
  taskList: task[] = [];
}
