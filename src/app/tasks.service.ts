import { Task } from './task';
import { Injectable } from '@angular/core';

@Injectable()
export class TasksService {
  private tasks: Array<Task>;

  constructor() { 
    this.tasks = []
  }

  getTasks(): Array<Task> {
    return this.tasks
  }

  addTask( task: Task ) {
    this.tasks.push()
  }

}
