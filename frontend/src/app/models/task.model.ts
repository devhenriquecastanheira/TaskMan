export type TaskStatus =
  'Pendente' |
  'Em andamento' |
  'Concluída';

export interface Task {
  id: number;
  titulo: string;
  descricao: string;
  status: TaskStatus;
}
