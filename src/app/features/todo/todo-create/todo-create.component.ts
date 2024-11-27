import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  ) {
    this.todoCreate = fb.group({
      title: ['', Validators.required],
      descritpion: ['', Validators.required],
      state: [false],
    });
  }
  addTask() {
    this.auth.userIdState$.subscribe((userId) => {
      this.userId = userId;

      if (this.userId) {
        this.todo.createNote(this.todoCreate.value, userId).subscribe({
          next: (Response) => {
            this.todoCreate.reset();
          },
        });
      }
    });
  }
}
