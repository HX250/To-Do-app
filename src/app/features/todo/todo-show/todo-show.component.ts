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
  filteredTaskList: task[] = [];

  isEditShown: boolean = false;
  currentChosenTask: task | undefined = undefined;

  filterStartDate: string = '';
  filterEndDate: string = '';

  constructor(private todo: TodoService) {}

  ngOnInit(): void {
    this.loadNotesMethod();
  }

  loadNotesMethod() {
    this.todo.loadNotes().subscribe({
      next: (Response) => {
        this.taskList = Response;
        this.filteredTaskList = [...this.taskList];
      },
    });
  }

  filterTasksByDate() {
    const startDate = new Date(this.filterStartDate);
    const endDate = new Date(this.filterEndDate);

    this.filteredTaskList = this.taskList.filter((task) => {
      const taskDate = new Date(task.createdAt);
      return (
        (!this.filterStartDate || taskDate >= startDate) &&
        (!this.filterEndDate || taskDate <= endDate)
      );
    });
  }

  resetFilter() {
    this.filterStartDate = '';
    this.filterEndDate = '';
    this.filteredTaskList = [...this.taskList];
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
