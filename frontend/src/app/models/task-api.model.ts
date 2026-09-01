import { TaskStatus } from './task.model';

export interface TaskApi {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
}
