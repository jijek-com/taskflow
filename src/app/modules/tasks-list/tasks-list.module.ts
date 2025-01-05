import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';

import { NzListModule } from 'ng-zorro-antd/list';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzInputModule } from 'ng-zorro-antd/input';

import { TasksListComponent } from './tasks-list.component';
import { TaskEditComponent } from './task-edit/task-edit.component';
import { TaskAddComponent } from './task-add/task-add.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzIconModule } from 'ng-zorro-antd/icon';

const routes: Routes = [{ path: '', component: TasksListComponent }];

@NgModule({
  declarations: [TasksListComponent, TaskAddComponent, TaskEditComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    NzButtonModule,
    NzInputModule,
    NzListModule,
    NzModalModule,
    NzFormModule,
    NzSelectModule,
    NzIconModule
  ]
})
export class TasksListModule {}
