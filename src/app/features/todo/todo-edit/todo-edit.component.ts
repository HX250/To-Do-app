import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { task } from '../models/task.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlertService } from 'src/app/core/services/alert/alert.service';
import { TodoService } from 'src/app/core/services/todo/todo.service';

@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.css'],
})
export class TodoEditComponent implements OnInit {
  editedTask!: FormGroup;

  @Input() currentTask: task | undefined;
  @Input() userId: string = '';
  @Output() updatedWindowShown = new EventEmitter<boolean>();

  constructor(
    private fb: FormBuilder,
    private alert: AlertService,
    private todo: TodoService,
  ) {}

  ngOnInit(): void {
    this.createEditFormGroup();
  }
  createEditFormGroup() {
    this.editedTask = this.fb.group({
      title: [this.currentTask?.title, ''],
      description: [this.currentTask?.description, ''],
    });
  }

  closeRoleSelection() {
    this.updatedWindowShown.emit();
  }

  closeModalWindow() {
    this.updatedWindowShown.emit();
  }

  updateTask(task: task | undefined) {
    if (
      task?.description === this.editedTask.value.description &&
      task?.title === this.editedTask.value.title
    ) {
      this.alert.showAlert('Task needs to be edited to submit', false);
    } else {
      this.todo
        .updateTask(this.userId, this.editedTask.value, task?.id)
        .subscribe({
          next: (Response) => {
            this.updatedWindowShown.emit();
          },
        });
    }
  }
}
