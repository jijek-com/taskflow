import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TasksListV2Component} from "./tasks-list-v2.component";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzListModule} from "ng-zorro-antd/list";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzModalModule} from "ng-zorro-antd/modal";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzSelectModule} from "ng-zorro-antd/select";
import { TaskEditComponent } from './task-edit/task-edit.component';
import { TaskAddComponent } from './task-add/task-add.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

const routes: Routes = [
  { path: '', component: TasksListV2Component },
]
@NgModule({
  declarations: [
    TasksListV2Component,
    TaskEditComponent,
    TaskAddComponent
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
export class TasksListV2Module {}
