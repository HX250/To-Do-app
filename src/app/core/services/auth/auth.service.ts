import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, EMPTY, map, Observable } from 'rxjs';
import { auth } from 'src/app/features/auth/models/auth.model';
import { AlertService } from '../alert/alert.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = 'http://localhost:3000/';

  private userIdSubject = new BehaviorSubject<string>(
    this.getStoredToken() || '',
  );
  userIdState$ = this.userIdSubject.asObservable();

  constructor(
    private router: Router,
    private http: HttpClient,
    private alert: AlertService,
  ) {}

  login(loginCred: auth): Observable<any> {
    return this.http.post(this.apiUrl + 'login', loginCred).pipe(
      map((Response: any) => {
        this.alert.showAlert('User has been logged in', true);
        this.setToken(Response.token);
        this.router.navigateByUrl('/todo');
        return true;
      }),
      catchError((err) => this.errorHandler(err)),
    );
  }

  register(registerCred: auth): Observable<any> {
    return this.http.post(this.apiUrl + 'register', registerCred).pipe(
      map((Response) => {
        this.alert.showAlert('User has been registered', true);
        this.router.navigateByUrl('/');
        return true;
      }),
      catchError((err) => this.errorHandler(err)),
    );
  }

  logout() {
    this.userIdSubject.next('');
    this.router.navigateByUrl('');
    localStorage.removeItem('token');
  }

  setToken(token: string): void {
    this.userIdSubject.next(token);
    localStorage.setItem('id', token);
  }

  private getStoredToken(): string | null {
    return localStorage.getItem('id');
  }

  errorHandler(err: any): Observable<any> {
    if (err.status === 0) {
      this.alert.showAlert('Server not accessible', false);
    } else if (err.status === 400) {
      this.alert.showAlert('Invalid credentials, please try again', false);
    } else if (err.status === 401) {
      this.alert.showAlert('Unauthorized, please log in again', false);
    } else if (err.status >= 500) {
      this.alert.showAlert('Server error, please try again later', false);
    }
    return EMPTY;
  }
}
