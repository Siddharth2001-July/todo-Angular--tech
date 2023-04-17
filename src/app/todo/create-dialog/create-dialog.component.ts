import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TodoService } from '../todo.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'pm-create-dialog',
  templateUrl: './create-dialog.component.html',
  styleUrls: ['./create-dialog.component.css']
})
export class CreateDialogComponent implements OnInit, OnDestroy {

  public taskForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private todoService: TodoService,
    public dialogRef: MatDialogRef<CreateDialogComponent>
  ) { }

  ngOnInit(): void {
    this.init();
  }
  ngOnDestroy(): void {
    this.todoService.getTasks().subscribe({

    })
  }

  public saveTask(): void {
    this.todoService.addTask(this.taskForm?.value).subscribe(res => console.log(`New task added with id = ${res}`))
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  private init(): void {
    this.taskForm = this.formBuilder.group({
      Name: new FormControl('', [Validators.required]),
      IsCompleted: false,
      doneOn: []
    });
  }

}
