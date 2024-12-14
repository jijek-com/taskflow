import { Component, type OnInit } from '@angular/core';

import { TasksListV2Service } from "./tasks-list-v2-service";

import { Statuses_Translations } from "../tasks-list/tasks-list-translations";
import { Task } from 'src/app/types/tasks.type';

@Component({
  selector: 'app-tasks-list-v2',
  templateUrl: './tasks-list-v2.component.html',
  styleUrls: ['./tasks-list-v2.component.scss']
})
export class TasksListV2Component implements OnInit {
  public tasks: Task[] = [
    { id: 1, title: 'Задача 1', description: 'Описание 1', status: 'completed' },
    { id: 2, title: 'Задача 2', description: 'Описание 2', status: 'in-progress' },
    { id: 3, title: 'Задача 3', description: 'Описание 3', status: 'pending' },
  ];

  public selectedTask: Task | null = null;
  public isAddModalVisible = false;
  public isEditModalVisible = false;
  public statusesTranslations = Statuses_Translations;

  constructor(private _taskStateService: TasksListV2Service) {
    this._taskStateService.setTasks(this.tasks)
  }

  public ngOnInit(): void {
    this._taskStateService.tasks$.subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  public openAddModal(): void {
    this.isAddModalVisible = true;
  }

  public closeAddModal(): void {
    this.isAddModalVisible = false;
  }

  public openEditModal(task: Task): void {
    this.selectedTask = task;
    this.isEditModalVisible = true;
  }

  public closeEditModal(): void {
    this.selectedTask = null;
    this.isEditModalVisible = false;
  }

  public deleteTask(taskId: number): void {
    this._taskStateService.deleteTask(taskId);
  }
}
