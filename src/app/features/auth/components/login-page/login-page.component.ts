import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = fb.group({
      email: [''],
      password: [''],
    });
  }
}
