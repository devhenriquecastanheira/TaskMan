import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task, TaskStatus } from '../../models/task.model';

@Component({
  imports: [FormsModule],
  selector: 'app-task-form',
  styleUrl: './task-form.css',
  templateUrl: './task-form.html',
})
export class TaskForm {
  titulo = '';
  descricao = '';
  status: TaskStatus = 'Pendente';

  tarefaAdicionada = output<Task>();

  adicionarTarefa() {
    if (!this.titulo.trim() || !this.descricao.trim()) {
      return;
    }

    const novaTarefa: Task = {
      id: 0,
      titulo: this.titulo.trim(),
      descricao: this.descricao.trim(),
      status: this.status
    };

    this.tarefaAdicionada.emit(novaTarefa);

    this.titulo = '';
    this.descricao = '';
    this.status = 'Pendente';
  }
}
