import {Component, computed, inject} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../../services/task';

@Component({
  imports: [],
  selector: 'app-task-details',
  styleUrl: './task-details.css',
  templateUrl: './task-details.html',
})
export class TaskDetails {
  private readonly route = inject(ActivatedRoute);
  private readonly taskService = inject(TaskService);

  id = Number(this.route.snapshot.paramMap.get('id'));

  tarefa = computed(() =>
    this.taskService.buscarPorId(this.id)
  )
}
