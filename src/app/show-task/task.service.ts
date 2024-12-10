import { Injectable } from '@angular/core';
import { task } from '../app.interface';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks: task[] = [];

  constructor() {}

  setTasks(tasks: task[]) {
    this.tasks = tasks;
  }

  updateTask(originalTask: task, updatedData: Partial<task>) {
    const taskIndex = this.tasks.findIndex(t => t.title === originalTask.title &&
      t.description === originalTask.description);
    if (taskIndex !== -1) {
      this.tasks[taskIndex] = { ...this.tasks[taskIndex], ...updatedData };
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
  }
}
