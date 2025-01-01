import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

export interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
}

@Component({
  selector: 'app-tasks-list-v4',
  templateUrl: './tasks-list-v4.component.html',
  styleUrls: ['./tasks-list-v4.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksListV4Component {
  public tasks: Task[] = [
    { id: 1, title: 'Task 1', description: 'First task', status: 'pending' },
    { id: 2, title: 'Task 2', description: 'Second task', status: 'in-progress' },
    { id: 3, title: 'Task 3', description: 'Third task', status: 'completed' }];

  public taskForm: FormGroup;
  public isModalVisible: boolean = false;
  public isEditing: boolean = false;
  public currentTask: Task | null = null;

  constructor(private _fb: FormBuilder) {
    this.taskForm = this._fb.group({
      id: [''],
      title: ['', Validators.required],
      description: [''],
      status: [''],
    });
  }

  public statusesTranslations: { [key: string]: string } = {
    'completed': 'Завершено',
    'in-progress': 'В процессе',
    'pending': 'Ожидание'
  }

  public openModal(task?: Task): void {
    if (task) {
      this.isEditing = true;
      this.currentTask = task;
      this.taskForm.patchValue(task);
    } else {
      this.isEditing = false;
      this.taskForm.reset();
    }
    this.isModalVisible = true;
  }

  public closeModal(): void {
    this.isModalVisible = false;
    this.taskForm.reset();
    this.isEditing = false;
    this.currentTask = null;
  }

  public addTask(task: Task): void {
    const maxId = this.tasks.length > 0 ? Math.max(...this.tasks.map(task => task.id)) : 0;
    this.tasks.push({ ...task, id: maxId + 1 });
    this.tasks = [...this.tasks];
    this.closeModal();
  }

  public updateTask(updatedTask: Task): void {
    const index = this.tasks.findIndex(task => task.id === updatedTask.id);
    if (index !== -1) {
      this.tasks[index] = { ...updatedTask };
    }
    this.tasks = [...this.tasks];
    this.closeModal();
  }

  public deleteTask(taskId: number): void {
    this.tasks = this.tasks.filter(task => task.id !== taskId);
  }
}
