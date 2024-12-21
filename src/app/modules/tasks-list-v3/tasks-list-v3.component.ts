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

  private isSynced = false;

  public statusesTranslations = Statuses_Translations;
  public destroy$ = new Subject<void>();

  constructor(
    private _cdr: ChangeDetectorRef,
    private _tasksListService: TasksListV3Service,
    private _tasksListChannelBroadcast: TasksListChannelBroadcastService) {}

  public ngOnInit(): void {
    this._tasksListChannelBroadcast.onMessage<{ type: TaskOperationType; task?: Task; tasks?: Task[] }>(
      this.nameChannel,
      (message) => {
        if (message.data) {
          switch (message.data.type) {
            case 'ADD':
              if (message.data.task) {
                this._tasksListService.addTask(message.data.task);
                this.tasks = [...this.tasks, message.data.task];
                this._cdr.detectChanges();
              }
              break;
            case 'UPDATE':

              if (message.data.task) {
                this._tasksListService.updateTask(message.data.task);
                this.tasks = [...message.data.tasks || []];
                this._cdr.detectChanges();
              }
              console.log('UPDATE', this.tasks, message.data.tasks);
              break;
            case 'REMOVE':

              if (message.data.task) {
                this._tasksListService.deleteTask(message.data.task.id);
                this.tasks = [...message.data.tasks || []];
                this._cdr.detectChanges();
              }
              break;
            case 'SYNC_REQUEST':
                this._tasksListChannelBroadcast.sendMessage(this.nameChannel, {
                  type: 'SYNC',
                  tasks: [...this.tasks]
                });
                this._cdr.detectChanges();
              break;
            case 'SYNC':
              if (message.data.tasks && !this.isSynced) {
                this.tasks = message.data.tasks;
                this.isSynced = true;
                this._cdr.detectChanges();
              }
              break;
          }
        }
      }
    );

    this._tasksListChannelBroadcast.sendMessage(this.nameChannel, { type: 'SYNC_REQUEST', tasks: [] });

    this._tasksListService.tasks$.pipe(takeUntil(this.destroy$)).subscribe((tasks) => {
      if (!this.isSynced) {
        this.tasks = tasks;
        this._cdr.detectChanges();
      }

      if (this.isSynced) {
        this._tasksListChannelBroadcast.sendMessage(this.nameChannel, { type: 'SYNC_REQUEST', tasks: this.tasks });
      }

      this._cdr.detectChanges();
    });
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
    const id = this.tasks.length ? Math.max(...this.tasks.map(t => t.id)) + 1 : 1;
    this.tasks = [...this.tasks, {...newTask, id}];

    this._tasksListService.addTask(newTask);

    this._tasksListChannelBroadcast.sendMessage(this.nameChannel, { type: 'ADD', task: newTask });
    this._tasksListChannelBroadcast.sendMessage(this.nameChannel, {
      type: 'SYNC',
      tasks: this.tasks
    });
    this.isSynced = true
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
    this._tasksListChannelBroadcast.sendMessage(this.nameChannel, { type: 'UPDATE', task: updatedTask });
    this._tasksListChannelBroadcast.sendMessage(this.nameChannel, {
      type: 'SYNC',
      tasks: [...this.tasks]
    });
    this.isSynced = true
  }

  public deleteTask(task: Task): void {
    this.tasks = this.tasks.filter(t => t.id !== task.id);
    this._tasksListService.deleteTask(task.id);

    this._tasksListChannelBroadcast.sendMessage(this.nameChannel, { type: 'REMOVE', task: task, tasks: this.tasks });
    this._tasksListChannelBroadcast.sendMessage(this.nameChannel, {
      type: 'SYNC',
      tasks: this.tasks
    });
    this.isSynced = true
  }
}
