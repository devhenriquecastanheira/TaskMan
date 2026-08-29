import { Component, effect, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task, TaskStatus } from '../../models/task.model';

@Component({
  imports: [FormsModule],
  selector: 'app-task-form',
  styleUrl: './task-form.css',
  templateUrl: './task-form.html',
})
export class TaskForm {
  constructor() {
    effect(() => {
      const tarefa = this.tarefa();

      if (tarefa) {
        this.titulo = tarefa.titulo;
        this.descricao = tarefa.descricao;
        this.status = tarefa.status;
      }
    });
  }
  titulo = '';
  descricao = '';
  status: TaskStatus = 'Pendente';

  tarefaSalva = output<Task>();
  tarefa = input<Task | null>(null);

  adicionarTarefa() {
    if (!this.titulo.trim() || !this.descricao.trim()) {
      return;
    }

    const novaTarefa: Task = {
      id: this.tarefa()?.id ?? 0,
      titulo: this.titulo.trim(),
      descricao: this.descricao.trim(),
      status: this.status
    };

    this.tarefaSalva.emit(novaTarefa);

    this.titulo = '';
    this.descricao = '';
    this.status = 'Pendente';
  }
}
