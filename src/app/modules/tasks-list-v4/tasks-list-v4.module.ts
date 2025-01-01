import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TasksListV4Component} from "./tasks-list-v4.component";
import {NzListModule} from "ng-zorro-antd/list";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzButtonModule} from "ng-zorro-antd/button";
import {RouterModule, Routes} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzGridModule} from "ng-zorro-antd/grid";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzModalModule} from "ng-zorro-antd/modal";
import {NzSelectModule} from "ng-zorro-antd/select";

const routes: Routes = [
  { path: '', component: TasksListV4Component },
]

@NgModule({
  declarations: [TasksListV4Component],
  imports: [
    CommonModule,
    NzListModule,
    NzIconModule,
    NzButtonModule,
    RouterModule.forChild(routes),
    FormsModule,
    NzFormModule,
    NzGridModule,
    NzInputModule,
    NzModalModule,
    NzSelectModule,
    ReactiveFormsModule,
  ]
})
export class TasksListV4Module {
}
