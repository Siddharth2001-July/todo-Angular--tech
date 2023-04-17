import { Component, OnInit, ViewChild } from '@angular/core';
import { TodoService } from './todo.service';
import { ITodo } from './todo';
import { MatDialog } from '@angular/material/dialog';
import { CreateDialogComponent } from './create-dialog/create-dialog.component';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';

@Component({
  selector: 'pm-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  title: string = "To-Do List"
  tasks: ITodo[] = []

  constructor(
    private todoService: TodoService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getTasks()
  }

  getTasks(): void {
    this.todoService.getTasks().subscribe({
      next: tasks => this.tasks = tasks,
      error: err => this.tasks = err
    });
  }

  removeTask(task: ITodo) {
    this.todoService.deleteTask(task).subscribe({
      next: (deleted) => {
        let ind = this.tasks.indexOf(deleted)
        this.tasks.splice(ind, 1)
      }
    })
  }

  taskCompleted(task: ITodo) {
    task.isCompleted = !task.isCompleted
    this.todoService.updateTask(task).subscribe()
  }

  openEdit(task: ITodo) {
    const eddia = this.dialog.open(EditDialogComponent, {
      data: task
    })
    //console.log(task);

    eddia.afterClosed().subscribe(res => {
      this.ngOnInit()
    })
  }

  openDialog() {
    const dialogRef = this.dialog.open(CreateDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit()
    });
  }
}