import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from 'src/app/types/tasks.type';

@Injectable({
  providedIn: 'root'
})
export class TasksListV3Service {
  private taskList: Task[] = [
    {
      id: 1,
      title: 'Задача 1',
      description: 'Описание 1',
      status: 'completed'
    },
    {
      id: 2,
      title: 'Задача 2',
      description: 'Описание 2',
      status: 'in-progress'
    },
    { id: 3, title: 'Задача 3', description: 'Описание 3', status: 'pending' }
  ];

  public tasksListSubject = new BehaviorSubject<Task[]>([]);
  public tasks$ = this.tasksListSubject.asObservable();

  constructor() {
    this.tasksListSubject.next(this.taskList);
  }

  public addTask(newTask: Task): void {
    const currentTasks = [...this.tasksListSubject.value];
    newTask.id = currentTasks.length
      ? Math.max(...currentTasks.map((t) => t.id)) + 1
      : 1;
    const updatedTasks = [...currentTasks, newTask];
    this.tasksListSubject.next(updatedTasks);
  }

  public updateTask(updatedTask: Task): void {
    const currentTasks = this.tasksListSubject.value;
    const taskIndex = currentTasks.findIndex(
      (task) => task.id === updatedTask.id
    );

    if (taskIndex !== -1) {
      currentTasks[taskIndex] = updatedTask;
      this.tasksListSubject.next([...currentTasks]);
    }
  }

  public deleteTask(taskId: number): void {
    const currentTasks = this.tasksListSubject.value;
    const updatedTasks = currentTasks.filter((task) => task.id !== taskId);

    this.tasksListSubject.next(updatedTasks);
  }
}
