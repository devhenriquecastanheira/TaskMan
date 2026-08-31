import {inject, Service, signal} from '@angular/core';
import {Task, TaskStatus} from '../models/task.model';
import {HttpClient} from '@angular/common/http';


interface TaskApi {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
}
@Service()
export class TaskService {
  private readonly http = inject(HttpClient)

  private readonly apiUrl =
    'http://localhost:5089/api/tasks';

  readonly tarefas = signal<Task[]>([]);

  carregarTarefas() {
    this.http.get<TaskApi[]>(this.apiUrl)
      .subscribe(tasksApi => {

        const tasks: Task[] = tasksApi.map(task => ({
          id: task.id,
          titulo: task.title,
          descricao: task.description,
          status: task.status
        }));

        this.tarefas.set(tasks);
      });
  }

  excluirTarefa(id: number) {
    this.tarefas.update(tarefas =>
      tarefas.filter(tarefa => tarefa.id !== id)
    );
  }

  adicionarTarefa(tarefa: Task) {
    const taskApi = {
      title: tarefa.titulo,
      description: tarefa.descricao,
      status: tarefa.status
    };

    return this.http.post<TaskApi>(
      this.apiUrl,
      taskApi
    );
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

  atualizarTarefa(tarefaAtualizada: Task) {
    this.tarefas.update(tarefas =>
      tarefas.map(tarefa =>
        tarefa.id === tarefaAtualizada.id
          ? tarefaAtualizada
          : tarefa
      )
    );
  }
}
