import { Injectable } from "@angular/core";
import { ITodo } from "./todo";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, catchError, tap, throwError } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class TodoService {
    public base = "https://localhost:7132/api";
    private getTasksUrl = this.base + "/index";
    private addTaskUrl = this.base + "/Add";
    private updateTaskUrl = this.base + "/Edit";
    private deleteTaskUrl = this.base + "/Delete";

    constructor(private http: HttpClient) { }

    getTasks(): Observable<ITodo[]> {
        return this.http.get<ITodo[]>(this.getTasksUrl).pipe(
            tap(),
            catchError(this.handleError)
        );
    }

    addTask(newTask: ITodo): Observable<any> {
        console.log(newTask);
        return this.http.post(this.addTaskUrl, newTask).pipe(
            tap(),
            catchError(this.handleError)
        );
    }

    updateTask(task: ITodo): Observable<any> {
        return this.http.put(this.updateTaskUrl, task).pipe(
            tap(res => console.log("success " + res)),
            catchError(this.handleError)
        )
    }

    deleteTask(task: ITodo): Observable<any> {
        return this.http.delete(this.deleteTaskUrl+"?id="+task.id).pipe(
            tap(res => console.log("Deleted " + task)),
            catchError(this.handleError)
        )
    }

    private handleError(err: HttpErrorResponse) {
        let errorMessage = ''
        //Front-End Error
        if (err.error instanceof ErrorEvent) {
            errorMessage = `An error occurred : ${err.error.message}`
        }
        //Back-End Error
        else {
            errorMessage = `Server returned code : ${err.status} with error message : ${err.message}`;
        }
        console.log(errorMessage);
        return throwError(() => errorMessage)
    }
}