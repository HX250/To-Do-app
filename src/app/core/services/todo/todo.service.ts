import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertService } from '../alert/alert.service';
import { catchError, EMPTY, map, Observable } from 'rxjs';
import { task } from 'src/app/features/todo/models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  apiUrl = 'http://localhost:3000/';
  constructor(
    private http: HttpClient,
    private alert: AlertService,
  ) {}

  createNote(task: task, userId: string): Observable<task> {
    return this.http
      .post<task>(this.apiUrl + `createNote?userId=${userId}`, task)
      .pipe(
        map(() => {
          this.alert.showAlert('Task has been created', true);
        }),
        catchError((err) => this.errorHandler(err)),
      );
  }

  loadNotes(userId: string): Observable<task[]> {
    return this.http
      .get<task[]>(`${this.apiUrl}userNotes?userId=${userId}`)
      .pipe(
        map((tasks) => tasks.map((task) => ({ ...task }))),
        catchError((err) => this.errorHandler(err)),
      );
  }

  updateState(task: task, userId: string): Observable<any> {
    return this.http
      .put<any>(
        `${this.apiUrl}userNotes?userId=${userId}&taskId=${task.id}`,
        task,
      )
      .pipe(
        map(() => {
          this.alert.showAlert('State has been updated', true);
        }),
        catchError((err) => this.errorHandler(err)),
      );
  }

  deleteTask(userId: string, id?: number): Observable<any> {
    return this.http
      .delete<any>(`${this.apiUrl}deleteNote?userId=${userId}&taskId=${id}`)
      .pipe(
        map(() => {
          this.alert.showAlert('Task has been deleted', true);
        }),
        catchError((err) => this.errorHandler(err)),
      );
  }

  errorHandler(err: any): Observable<any> {
    if (err.status === 0) {
      this.alert.showAlert('Server not accessible', false);
    } else if (err.status === 400) {
      this.alert.showAlert('Bad request, please try again', false);
    } else if (err.status === 401) {
      this.alert.showAlert('Unauthorized, please log in again', false);
    } else if (err.status >= 500) {
      this.alert.showAlert('Server error, please try again later', false);
    }
    return EMPTY;
  }
}
