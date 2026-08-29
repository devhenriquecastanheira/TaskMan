import { Service, signal } from '@angular/core';
import { Task, TaskStatus } from '../models/task.model';

@Service()
export class TaskService {
  readonly tarefas = signal<Task[]>([
    {
      id: 1,
      titulo: 'Estudar Angular',
      descricao: 'Aprender como funcionam componentes',
      status: 'Pendente'
    },
    {
      id: 2,
      titulo: 'Estudar C#',
      descricao: 'Revisar orientação a objetos',
      status: 'Concluída'
    },
    {
      id: 3,
      titulo: 'Fazer TaskMan',
      descricao: 'Continuar desenvolvimento do projeto',
      status: 'Em andamento'
    }
  ]);

  excluirTarefa(id: number) {
    this.tarefas.update(tarefas =>
      tarefas.filter(tarefa => tarefa.id !== id)
    );
  }

  adicionarTarefa(tarefa: Task) {
    const tarefasAtuais = this.tarefas();

    const maiorId = tarefasAtuais.length > 0
      ? Math.max(...tarefasAtuais.map(tarefa => tarefa.id))
      : 0;

    const novaTarefa: Task = {
      ...tarefa,
      id: maiorId + 1
    };

    this.tarefas.update(tarefas => [
      ...tarefas,
      novaTarefa
    ]);
  }

  alterarStatus(id: number, status: TaskStatus) {
    this.tarefas.update(tarefas =>
      tarefas.map(tarefa =>
        tarefa.id === id
          ? { ...tarefa, status }
          : tarefa
      )
    );
  }

  buscarPorId(id: number) {
    return this.tarefas().find(tarefa => tarefa.id === id);
  }
}
