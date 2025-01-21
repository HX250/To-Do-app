import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/core/services/todo/todo.service';
import { task } from '../models/task.model';

@Component({
  selector: 'app-todo-show',
  templateUrl: './todo-show.component.html',
  styleUrls: ['./todo-show.component.css'],
})
export class TodoShowComponent implements OnInit {
  taskList: task[] = [];

  isEditShown: boolean = false;
  currentChosenTask: task | undefined = undefined;

  constructor(private todo: TodoService) {}

  ngOnInit(): void {
    this.loadNotesMethod();
  }

  loadNotesMethod() {
    this.todo.loadNotes().subscribe({
      next: (Response) => {
        this.taskList = Response;
      },
    });
  }

  completeTask(id?: number) {
    const task = this.taskList.find((task) => task.id === id);

    if (task) {
      task.state = !task.state;

      this.todo.updateTask(task).subscribe();
    }
  }
  removeTask(id?: number) {
    this.todo.deleteTask(id).subscribe({
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
