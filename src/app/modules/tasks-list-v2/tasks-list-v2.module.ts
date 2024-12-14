import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TasksListV2Component} from "./tasks-list-v2.component";

const routes: Routes = [
  { path: '', component: TasksListV2Component },
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class TasksListV2Module {}
