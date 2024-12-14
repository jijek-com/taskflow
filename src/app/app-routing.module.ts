import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TasksListModule} from "./modules/tasks-list/tasks-list.module";

const routes: Routes = [
  {
    path: 'tasks-list',
    loadChildren: () =>
      import('./modules/tasks-list/tasks-list.module').then((m) => m.TasksListModule),
  },
  {
    path: 'tasks-list-v2',
    loadChildren: () =>
      import('./modules/tasks-list-v2/tasks-list-v2.module').then((m) => m.TasksListV2Module),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
