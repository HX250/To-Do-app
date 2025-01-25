import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/core/services/alert/alert.service';
import { TodoService } from 'src/app/core/services/todo/todo.service';

@Component({
  selector: 'app-todo-create',
  templateUrl: './todo-create.component.html',
  styleUrls: ['./todo-create.component.css'],
})
export class TodoCreateComponent implements OnInit {
  todoCreate!: FormGroup;
  userId: string = '';

  constructor(
    private fb: FormBuilder,
    private todo: TodoService,
    private alert: AlertService,
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.todoCreate = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  addTask() {
    if (this.todoCreate.invalid) {
      this.alert.showAlert('Please fill all the fields', false);
      this.todoCreate.markAllAsTouched();
      return;
    }
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
