import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/core/services/alert/alert.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { TodoService } from 'src/app/core/services/todo/todo.service';

@Component({
  selector: 'app-todo-create',
  templateUrl: './todo-create.component.html',
  styleUrls: ['./todo-create.component.css'],
})
export class TodoCreateComponent {
  todoCreate: FormGroup;
  userId: string = '';

  constructor(
    private fb: FormBuilder,
    private todo: TodoService,
    private auth: AuthService,
    private alert: AlertService,
  ) {
    this.todoCreate = fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      Date: [new Date()],
      state: [false],
    });
  }
  addTask() {
    this.todo.testingTaskList.push(this.todoCreate.value);
    this.todoCreate.reset();
    this.alert.showAlert('Task has been created', true);
    //this.auth.userIdState$.subscribe((userId) => {
    //  this.userId = userId;
    //
    //  if (this.userId) {
    //    this.todo.createNote(this.todoCreate.value, userId).subscribe({
    //      next: (Response) => {
    //        this.todoCreate.reset();
    //      },
    //    });
    //  }
    //});
  }
}
