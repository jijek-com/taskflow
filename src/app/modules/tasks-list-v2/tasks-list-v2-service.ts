import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Task } from "src/app/types/tasks.type";

@Injectable({
  providedIn: 'root'
})
export class TasksListV2Service {
  private tasksListSubject = new BehaviorSubject<Task[]>([]);
  public tasks$ = this.tasksListSubject.asObservable();

  public setTasks(tasks: Task[]): void {
    this.tasksListSubject.next(tasks);
  }

  public addTask(task: Task): void {
    const currentTasks = this.tasksListSubject.value;

    task.id = currentTasks.length ? Math.max(...currentTasks.map((t) => t.id)) + 1 : 1;
    this.tasksListSubject.next([...currentTasks, task]);
  }

  public updateTask(updatedTask: Task): void {
    const currentTasks = this.tasksListSubject.value;
    const taskIndex = currentTasks.findIndex(task => task.id === updatedTask.id);
    if (taskIndex !== -1) {
      currentTasks[taskIndex] = updatedTask;
      this.tasksListSubject.next([...currentTasks]);
    }
  }

  public deleteTask(taskId: number): void {
    const currentTasks = this.tasksListSubject.value;
    const updatedTasks = currentTasks.filter(task => task.id !== taskId);
    this.tasksListSubject.next(updatedTasks);
  }
}
