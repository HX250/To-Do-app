import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/core/services/todo/todo.service';
import { task } from '../models/task.model';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { state } from '@angular/animations';

@Component({
  selector: 'app-todo-show',
  templateUrl: './todo-show.component.html',
  styleUrls: ['./todo-show.component.css'],
})
export class TodoShowComponent implements OnInit {
  taskList: task[] = [];
  userId: string = '';

  constructor(
    private todo: TodoService,
    private auth: AuthService,
  ) {}

  ngOnInit(): void {
    this.auth.userIdState$.subscribe((userId) => {
      this.userId = userId;

      if (this.userId) {
        this.todo.loadNotes(this.userId).subscribe({
          next: (Response) => {
            this.taskList = Response;
          },
        });
      }
    });
  }

  completeTask(id?: number) {
    const task = this.taskList.find((task) => task.id === id);

    if (task) {
      task.state = !task.state;

      this.todo.updateState(task, this.userId).subscribe();
    }
  }
  removeTask(id?: number) {
    this.todo.deleteTask(this.userId, id).subscribe({
      next: (Response) => {
        window.location.reload();
      },
    });
  }
  editTask(id?: number) {
    console.log(id);
  }
}
