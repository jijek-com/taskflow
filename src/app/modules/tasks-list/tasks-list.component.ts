import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Task} from "./tasks-list.type";
import {Statuses_Translations} from "./tasks-list-translations";

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
  public isEditModalVisible = false;
  public statusesTranslations = Statuses_Translations;

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
}
