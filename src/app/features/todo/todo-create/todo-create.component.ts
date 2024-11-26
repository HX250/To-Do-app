import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo-create',
  templateUrl: './todo-create.component.html',
  styleUrls: ['./todo-create.component.css'],
})
export class TodoCreateComponent {
  todoCreate: FormGroup;

  constructor(private fb: FormBuilder) {
    this.todoCreate = fb.group({
      title: ['', Validators.required],
      descritpion: ['', Validators.required],
      state: [false],
    });
  }
  addTask() {
    console.log(this.todoCreate.value);
  }
}
