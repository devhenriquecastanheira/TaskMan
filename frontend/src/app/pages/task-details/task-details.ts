import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskForm } from '../../components/task-form/task-form';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task';

@Component({
  imports: [TaskForm],
  selector: 'app-task-details',
  styleUrl: './task-details.css',
  templateUrl: './task-details.html',
})
export class TaskDetails {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly taskService = inject(TaskService);

  id = Number(this.route.snapshot.paramMap.get('id'));

  tarefa = computed(() =>
    this.taskService.buscarPorId(this.id)
  );

  atualizarTarefa(tarefa: Task) {
    this.taskService
      .atualizarTarefa(tarefa)
      .subscribe(() => {
        this.router.navigate(['/tarefas']);
      })
  }
}
