import {Component, ElementRef, ViewChild} from '@angular/core';
import { task } from '../app.interface'
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.css',
  imports: [
    FormsModule,
    NgIf
  ],
  standalone: true
})
export class CreateTaskComponent {

  successMessage: string = ''

  newTask: task = {
    title: '',
    description: '',
    done: false
  }

  @ViewChild('inputTitle') inputTitle: ElementRef | undefined

  public saveTask() {
    const storedTasks: string | null = localStorage.getItem('tasks')
    let tasks = storedTasks ? JSON.parse(storedTasks) : []

    tasks.push(this.newTask)

    localStorage.setItem('tasks', JSON.stringify(tasks))

    this.successMessage = 'وظیفه با موفقیت ذخیره شد'

    this.newTask.title = ''
    this.newTask.description = ''

    setTimeout(() => {
      if (this.inputTitle) {
        this.inputTitle.nativeElement.focus()
      }
    }, 100)

    setTimeout(() => {
      this.successMessage = ''
    }, 2000)
  }
}
