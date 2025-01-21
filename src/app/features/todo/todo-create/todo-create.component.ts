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
    });
  }
  addTask() {
    this.todo.createNote(this.todoCreate.value).subscribe({
      next: (Response) => {
        this.todoCreate.reset();
      },
      complete: () => {
        this.alert.showAlert('Task has been created', true);
      },
    });
  }
}
