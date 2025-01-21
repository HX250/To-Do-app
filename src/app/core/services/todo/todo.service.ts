import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertService } from '../alert/alert.service';
import { catchError, EMPTY, map, Observable } from 'rxjs';
import { task } from 'src/app/features/todo/models/task.model';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  apiUrl = 'http://localhost:5110/';
  constructor(
    private http: HttpClient,
    private alert: AlertService,
  ) {}

  createNote(task: task): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}api/ToDo`, task).pipe(
      map(() => {
        this.alert.showAlert('Task has been created', true);
      }),
      catchError((err) => this.errorHandler(err)),
    );
  }

  loadNotes(): Observable<task[]> {
    return this.http
      .get<task[]>(`${this.apiUrl}api/ToDo`)
      .pipe(catchError((err) => this.errorHandler(err)));
  }

  deleteTask(id?: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}api/ToDo/${id}`).pipe(
      map(() => {
        this.alert.showAlert('Task has been deleted', true);
      }),
      catchError((err) => this.errorHandler(err)),
    );
  }

  updateTask(taskForm: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}api/ToDo`, taskForm).pipe(
      map(() => {
        this.alert.showAlert('Task has been updated', true);
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
