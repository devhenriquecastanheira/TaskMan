import { Component, input, output } from '@angular/core';
import { TaskStatus } from '../../models/task.model';

@Component({
  imports: [],
  selector: 'app-task-card',
  styleUrl: './task-card.css',
  templateUrl: './task-card.html',
})
export class TaskCard {
  titulo = input.required<string>();
  descricao = input.required<string>();
  status = input.required<string>();

  remover = output<void>();
  statusAlterado = output<TaskStatus>();

  excluir() {
    this.remover.emit();
  }

  alterarStatus(novoStatus: TaskStatus) {
    this.statusAlterado.emit(novoStatus);
  }
}
