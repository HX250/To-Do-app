import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
  ) {
    this.loginForm = fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  loginUser() {
    this.auth.login(this.loginForm.value).subscribe();
  }

  get f() {
    return this.loginForm.controls;
  }
}