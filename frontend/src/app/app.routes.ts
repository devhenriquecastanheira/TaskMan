import { Routes } from '@angular/router';
import { TaskList } from './pages/task-list/task-list';
import { TaskCreate } from './pages/task-create/task-create';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/tarefas',
    pathMatch: 'full'
  },
  {
    path: 'tarefas',
    component: TaskList
  },
  {
    path: 'nova-tarefa',
    component: TaskCreate
  }
];
