import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksListV2Component } from './tasks-list-v2.component';

describe('TasksListV2Component', () => {
  let component: TasksListV2Component;
  let fixture: ComponentFixture<TasksListV2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TasksListV2Component]
    });
    fixture = TestBed.createComponent(TasksListV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
