import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/core/services/todo/todo.service';
import { task } from '../models/task.model';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-todo-show',
  templateUrl: './todo-show.component.html',
  styleUrls: ['./todo-show.component.css'],
})
export class TodoShowComponent implements OnInit {
  taskList: task[] = [];
  userId: string = '';
  isEditShown: boolean = false;
  currentChosenTask: task | undefined = undefined;

  constructor(
    private todo: TodoService,
    private auth: AuthService,
  ) {}

  ngOnInit(): void {
    this.auth.userIdState$.subscribe((userId) => {
      this.userId = userId;

      if (this.userId) {
        this.loadNotesMethod();
      }
    });
  }

  loadNotesMethod() {
    this.todo.loadNotes(this.userId).subscribe({
      next: (Response) => {
        this.taskList = Response;
      },
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
        this.loadNotesMethod();
      },
    });
  }
  editTask(task: task) {
    this.isEditShown = true;
    this.currentChosenTask = task;
  }

  closeEdit() {
    this.loadNotesMethod();
    this.isEditShown = false;
  }
}
