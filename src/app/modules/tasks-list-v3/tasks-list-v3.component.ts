import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, type OnInit } from '@angular/core';
import { Task, TaskOperationType } from "../../types/tasks.type";
import { Statuses_Translations } from "../tasks-list/tasks-list-translations";
import { TasksListChannelBroadcastService } from "./tasks-list-v3-channel-broadcast.service";
import { TasksListV3Service } from "./tasks-list-v3.service";
import { Subject, takeUntil } from "rxjs";

@Component({
  selector: 'app-tasks-list-v3',
  templateUrl: './tasks-list-v3.component.html',
  styleUrls: ['./tasks-list-v3.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksListV3Component implements OnInit, OnDestroy {
  public nameChannel: string = 'tasks-list-channel';

  public tasks: Task[] = [];

  public selectedTask: Task | null = null;
  public isAddModalVisible = false;
  public isEditModalVisible = false;

  public statusesTranslations = Statuses_Translations;
  public destroy$ = new Subject<void>();

  constructor(
    private _cdr: ChangeDetectorRef,
    private _tasksListService: TasksListV3Service,
    private _tasksListChannelBroadcast: TasksListChannelBroadcastService) {}

  public ngOnInit(): void {
    this._tasksListService.tasks$.pipe(takeUntil(this.destroy$)).subscribe((tasks) => {
      this.tasks = tasks;
      this._cdr.detectChanges();
    });

    this._tasksListChannelBroadcast.onMessage<{ type: TaskOperationType; task?: Task; tasks?: Task[] }>(
      this.nameChannel,
      (message) => {
        if (message.data) {
          switch (message.data.type) {
            case 'ADD':
              if (message.data.task) this._tasksListService.addTask(message.data.task);
              break;
            case 'UPDATE':
              if (message.data.task) this._tasksListService.updateTask(message.data.task);
              break;
            case 'REMOVE':
              if (message.data.task) this._tasksListService.deleteTask(message.data.task.id);
              break;
          }
        }
      }
    );
  }

  public ngOnDestroy(): void {
    this._tasksListChannelBroadcast.disconnectChannel(this.nameChannel);

    this.destroy$.next();
    this.destroy$.complete();
  }

  public openAddModal(): void {
    this.isAddModalVisible = true;
  }

  public closeAddModal(): void {
    this.isAddModalVisible = false;
  }

  public addTask(newTask: Task): void {
    this._tasksListService.addTask(newTask);
    this._tasksListChannelBroadcast.sendMessage(this.nameChannel, { type: 'ADD', task: newTask });
  }

  public openEditModal(task: Task): void {
    this.selectedTask = task;
    this.isEditModalVisible = true;

    this._cdr.detectChanges();
  }

  public closeEditModal(): void {
    this.selectedTask = null;
    this.isEditModalVisible = false;

    this._cdr.detectChanges();
  }

  public updateTask(updatedTask: Task): void {
    this.tasks = this.tasks.map(task => task.id === updatedTask.id ? updatedTask : task);

    this._tasksListService.updateTask(updatedTask);
    this._tasksListChannelBroadcast.sendMessage(this.nameChannel, { type: 'UPDATE', task: updatedTask,});
  }

  public deleteTask(task: Task): void {
    this.tasks = this.tasks.filter(task => task.id !== task.id);

    this._tasksListService.deleteTask(task.id);
    this._tasksListChannelBroadcast.sendMessage(this.nameChannel, { type: 'REMOVE', task: task });
  }
}
