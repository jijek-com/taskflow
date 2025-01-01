import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksListV4Component } from './tasks-list-v4.component';

describe('TasksListV4Component', () => {
  let component: TasksListV4Component;
  let fixture: ComponentFixture<TasksListV4Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TasksListV4Component]
    });
    fixture = TestBed.createComponent(TasksListV4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
