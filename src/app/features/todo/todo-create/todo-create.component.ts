import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodoService } from 'src/app/core/services/todo/todo.service';

@Component({
  selector: 'app-todo-create',
  templateUrl: './todo-create.component.html',
  styleUrls: ['./todo-create.component.css'],
})
export class TodoCreateComponent {
  todoCreate: FormGroup;

  constructor(
    private fb: FormBuilder,
    private todo: TodoService,
  ) {
    this.todoCreate = fb.group({
      title: ['', Validators.required],
      descritpion: ['', Validators.required],
      state: [false],
    });
  }
  addTask() {
    this.todo.createNote(this.todoCreate.value).subscribe({
      next: (Response) => {
        this.todoCreate.reset();
      },
    });
  }
}
