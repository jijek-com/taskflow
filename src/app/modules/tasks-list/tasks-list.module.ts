import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from "@angular/common";

import { ReactiveFormsModule } from "@angular/forms";

import { NzListModule } from "ng-zorro-antd/list";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzModalModule } from "ng-zorro-antd/modal";
import { NzInputModule } from "ng-zorro-antd/input";

import { TasksListComponent } from "./tasks-list.component";
import { TaskEditComponent } from './task-edit/task-edit.component';

const routes: Routes = [
  { path: '', component: TasksListComponent },
]

@NgModule({
  declarations: [
    TasksListComponent,
    TaskEditComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    NzButtonModule,
    NzInputModule,
    NzListModule,
    NzModalModule,
  ],
})
export class TasksListModule {}
