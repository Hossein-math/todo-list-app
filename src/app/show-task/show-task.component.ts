import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {task} from '../app.interface';
import {FormsModule} from '@angular/forms';
import {TaskService} from './task.service';

@Component({
  selector: 'app-show-task',
  imports: [
    NgForOf,
    FormsModule,
    NgIf
  ],
  templateUrl: './show-task.component.html',
  styleUrl: './show-task.component.css',
  standalone: true
})
export class ShowTaskComponent implements OnInit {
  tasks: task[] = []
  filteredTasks: task[] = []
  selectedFilter: string = 'all'
  editingTask: task | null = null

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks()
    this.applyFilter()
  }

  loadTasks() {
    const storedTasks: string | null = localStorage.getItem('tasks')
    if (storedTasks) {
      const parsedTasks = JSON.parse(storedTasks)
      this.tasks = parsedTasks
      this.taskService.setTasks(parsedTasks)
    }
  }

  applyFilter() {
    if (this.selectedFilter === 'completed') {
      this.filteredTasks = this.tasks.filter(task => task.done)
    } else if (this.selectedFilter === 'not-completed') {
      this.filteredTasks = this.tasks.filter(task => !task.done)
    } else {
      this.filteredTasks = this.tasks
    }
  }

  updateTaskStatus(task: task) {
    this.taskService.updateTask(task, {
      title: task.title,
      description: task.description,
      done: task.done
    })
    if (this.selectedFilter != 'all') {
      this.applyFilter()
    }
  }

  deleteTask(task: task) {
    this.tasks = this.tasks.filter(t => t !== task)
    this.filteredTasks = this.filteredTasks.filter(t => t !== task)
    localStorage.setItem('tasks', JSON.stringify(this.tasks))
  }

  startEditing(task: task) {
    this.editingTask = { ...task }
  }

  saveTask() {
    if (this.editingTask) {
      this.taskService.updateTask(this.editingTask, {
        title: this.editingTask.title,
        description: this.editingTask.description,
        done: this.editingTask.done
      })
      this.editingTask = null
      this.loadTasks()
      this.applyFilter()
    }
  }

  cancelEditing() {
    this.editingTask = null
  }

  onTitleChange(event: Event, task: task) {
    if (this.editingTask) {
      this.editingTask.title = (event.target as HTMLInputElement).value
      this.taskService.updateTask(task, {
        title: this.editingTask.title,
        description: task.description,
        done: task.done
      })
    }
  }

  onDescriptionChange(event: Event, task: task) {
    if (this.editingTask) {
      this.editingTask.description = (event.target as HTMLInputElement).value
      this.taskService.updateTask(task, {
        title: task.title,
        description: this.editingTask.description,
        done: task.done
      })
    }
  }
}
