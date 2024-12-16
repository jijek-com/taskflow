import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksListV3Component } from './tasks-list-v3.component';

describe('TasksListV3Component', () => {
  let component: TasksListV3Component;
  let fixture: ComponentFixture<TasksListV3Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TasksListV3Component]
    });
    fixture = TestBed.createComponent(TasksListV3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
