import { RouterModule, Routes } from "@angular/router";
import { TasksListV3Component } from "./tasks-list-v3.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzListModule } from "ng-zorro-antd/list";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzModalModule } from "ng-zorro-antd/modal";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzSelectModule } from "ng-zorro-antd/select";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TaskAddComponent } from './task-add/task-add.component';
import { TaskEditComponent } from './task-edit/task-edit.component';

const routes: Routes = [
  { path: '', component: TasksListV3Component },
]
@NgModule({
  declarations: [
    TasksListV3Component,
    TaskAddComponent,
    TaskEditComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NzButtonModule,
    NzInputModule,
    NzListModule,
    NzModalModule,
    NzFormModule,
    NzSelectModule,
    NzIconModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class TasksListV3Module {}
