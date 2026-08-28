import {Component, computed, inject, signal } from '@angular/core';
import { TaskCard } from './components/task-card/task-card';
import { TaskForm } from './components/task-form/task-form';
import { Task, TaskStatus } from './models/task.model';
import { TaskService } from './services/task';

@Component({
  imports: [TaskCard, TaskForm],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  nomeDoProjeto = 'TaskMan';
  descricao = 'Gerenciador de tarefas';
  versao = 1.1;
  quantidadeDeTarefas = computed(() => this.tarefas().length);
  quantidadePendentes = computed(() =>
    this.tarefas().filter(tarefa => tarefa.status === 'Pendente').length
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

  private readonly taskService = inject(TaskService);

  readonly tarefas = this.taskService.tarefas;

  excluirTarefa(id: number) {
    this.taskService.excluirTarefa(id);
  }

  adicionarTarefa(tarefa: Task) {
    this.taskService.adicionarTarefa(tarefa);
  }

  alterarStatus(id: number, status: TaskStatus) {
    this.taskService.alterarStatus(id, status);
  }

  alterarFiltro(filtro: FiltroStatus) {
    this.filtro.set(filtro);
  }
}
type FiltroStatus = 'Todas' | TaskStatus;
