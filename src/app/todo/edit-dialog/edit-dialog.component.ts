import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ITodo } from '../todo';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TodoService } from '../todo.service';

@Component({
  selector: 'pm-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit {

  public updateForm!: FormGroup;
  public taskData! : ITodo
  constructor(
    private formBuilder: FormBuilder,
    private todoService: TodoService,
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:ITodo
  ) { }

  ngOnInit(): void {
    this.taskData = this.data
    this.init()
    console.log(this.data);
  }

  public updateTask(): void {
    console.log(this.updateForm?.value);
    this.todoService.updateTask(this.updateForm?.value).subscribe(res => console.log(`Task Updated = ${res}`))
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  private init(): void {
    this.updateForm = this.formBuilder.group({
      id: [this.taskData.id],
      name: new FormControl( this.taskData.name, [Validators.required]),
      isCompleted: [this.taskData.isCompleted],
      doneOn: [this.taskData.doneOn]
    });
  }
}
