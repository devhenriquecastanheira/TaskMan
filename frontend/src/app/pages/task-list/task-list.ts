import { Component, computed, inject, signal } from '@angular/core';
import { TaskCard } from '../../components/task-card/task-card';
import { TaskService } from '../../services/task';
import { TaskStatus } from '../../models/task.model';

type FiltroStatus = 'Todas' | TaskStatus;

@Component({
  imports: [TaskCard],
  selector: 'app-task-list',
  styleUrl: './task-list.css',
  templateUrl: './task-list.html',
})
export class TaskList {
  private readonly taskService = inject(TaskService);

  readonly tarefas = this.taskService.tarefas;

  quantidadeDeTarefas = computed(() =>
    this.tarefas().length
  );

  quantidadePendentes = computed(() =>
    this.tarefas()
      .filter(tarefa => tarefa.status === 'Pendente')
      .length
  );

  filtro = signal<FiltroStatus>('Todas');

  tarefasFiltradas = computed(() => {
    if (this.filtro() === 'Todas') {
      return this.tarefas();
    }

    return this.tarefas().filter(
      tarefa => tarefa.status === this.filtro()
    );
  });

  alterarFiltro(filtro: FiltroStatus) {
    this.filtro.set(filtro);
  }

  excluirTarefa(id: number) {
    this.taskService.excluirTarefa(id);
  }

  alterarStatus(id: number, status: TaskStatus) {
    this.taskService.alterarStatus(id, status);
  }
}
