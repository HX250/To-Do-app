import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoShowComponent } from './todo-show.component';

describe('TodoShowComponent', () => {
  let component: TodoShowComponent;
  let fixture: ComponentFixture<TodoShowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TodoShowComponent]
    });
    fixture = TestBed.createComponent(TodoShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
