import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { alertState } from 'src/app/shared/components/alert/alert.model';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor() {}

  private alertSubject = new BehaviorSubject<alertState>({
    isShown: false,
    message: '',
    status: false,
  });
  alertState$ = this.alertSubject.asObservable();

  removeAlert() {
    this.alertSubject.next({ isShown: false, message: '', status: false });
  }

  showAlert(message: string, status: boolean) {
    this.alertSubject.next({ isShown: true, message: message, status: status });
    setTimeout(() => {
      this.removeAlert();
    }, 4000);
  }
}
