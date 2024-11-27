// alert.component.ts
import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/core/services/alert/alert.service';
import { alertState } from './alert.model';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent implements OnInit {
  alertState: alertState = {
    isShown: undefined,
    message: '',
    status: undefined,
  };

  constructor(private alertService: AlertService) {}

  ngOnInit(): void {
    this.alertService.alertState$.subscribe((state) => {
      this.alertState = state;
    });
  }
}
