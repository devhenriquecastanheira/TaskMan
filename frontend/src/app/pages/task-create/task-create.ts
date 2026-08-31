import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TaskForm } from '../../components/task-form/task-form';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task';

@Component({
  imports: [TaskForm],
  selector: 'app-task-create',
  styleUrl: './task-create.css',
  templateUrl: './task-create.html',
})
export class TaskCreate {
  private readonly taskService = inject(TaskService);
  private readonly router = inject(Router);

  adicionarTarefa(tarefa: Task) {
    this.taskService
      .adicionarTarefa(tarefa)
      .subscribe(() => {
        this.router.navigate(['/tarefas']);
      });
  }
}
