import { Routes } from '@angular/router';
import { CreateTaskComponent } from './create-task/create-task.component';
import {ShowTaskComponent} from './show-task/show-task.component';
import {RemoveTaskComponent} from './remove-task/remove-task.component';

export const routes: Routes = [
  { path: '', component: CreateTaskComponent },
  { path: 'show-tasks', component: ShowTaskComponent },
  { path: 'remove-tasks', component: RemoveTaskComponent },
];
