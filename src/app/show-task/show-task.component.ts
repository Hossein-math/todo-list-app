import {Component, OnInit} from '@angular/core';
import {NgForOf} from '@angular/common';
import {task} from '../app.interface';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-show-task',
  imports: [
    NgForOf,
    FormsModule
  ],
  templateUrl: './show-task.component.html',
  styleUrl: './show-task.component.css',
  standalone: true
})
export class ShowTaskComponent implements OnInit {

  tasks: task[] = []
  filteredTasks: task[] = []
  selectedFilter: string = 'all'

  ngOnInit(): void {
    this.loadTasks()
    this.applyFilter()
  }

  loadTasks() {
    const storedTasks: string | null = localStorage.getItem('task')
    if (storedTasks) {
      this.tasks = JSON.parse(storedTasks)
    }
  }

  applyFilter() {
    if (this.selectedFilter === 'completed') {
      console.log(this.tasks)
      this.filteredTasks = this.tasks?.filter(task => task.done)
    } else if (this.selectedFilter === 'not-completed') {
      this.filteredTasks = this.tasks?.filter(task => !task.done)
    } else {
      this.filteredTasks = this.tasks
      console.log(this.filteredTasks)
    }
  }

  updateTaskStatus(task: task) {
    const updatedTasks = this.tasks.map(t =>
      t.title === task.title ? { ...t, done: task.done } : t
    );
    this.tasks = updatedTasks
    localStorage.setItem('task', JSON.stringify(updatedTasks))
  }
}
