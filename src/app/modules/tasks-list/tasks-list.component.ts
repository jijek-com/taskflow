import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Statuses_Translations } from "./tasks-list-translations";
import { Task } from 'src/app/types/tasks.type';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksListComponent {
  public tasks: Task[] = [
    { id: 1, title: 'Задача 1', description: 'Описание 1', status: 'completed' },
    { id: 2, title: 'Задача 2', description: 'Описание 2', status: 'in-progress' },
    { id: 3, title: 'Задача 3', description: 'Описание 3', status: 'pending' },
  ];
  public selectedTask: Task | null = null;

  public isAddModalVisible = false;
  public isEditModalVisible = false;
  public statusesTranslations = Statuses_Translations;

  public openAddModal(): void {
    this.isAddModalVisible = true;
  }

  public closeAddModal(): void {
    this.isAddModalVisible = false;
  }

  public addTask(newTask: any): void {
    newTask.id = this.tasks.length ? Math.max(...this.tasks.map((t) => t.id)) + 1 : 1;
    this.tasks = [...this.tasks, newTask];

    this.closeAddModal();
  }

  public openEditModal(task: Task): void {
    this.selectedTask = task;
    this.isEditModalVisible = true;
  }

  public closeEditModal(): void {
    this.selectedTask = null;
    this.isEditModalVisible = false;
  }

  public updateTask(updatedTask: Task): void {
    this.tasks = this.tasks.map((t) =>
      t.id === updatedTask.id ? updatedTask : t
    );
    this.closeEditModal();
  }

  public deleteTask(taskId: number): void {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
  }
}
