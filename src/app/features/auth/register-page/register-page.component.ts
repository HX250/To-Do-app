import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
})
export class RegisterPageComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
  ) {}
  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.registerForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        repeatPassword: ['', [Validators.required]],
      },
      {
        validators: this.passwordMatchValidator,
      },
    );
  }

  registerUser() {
    this.auth.register(this.registerForm.value).subscribe();
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const repeatPassword = form.get('repeatPassword')?.value;
    if (password !== repeatPassword) {
      form.get('repeatPassword')?.setErrors({ passwordsMismatch: true });
    } else {
      form.get('repeatPassword')?.setErrors(null);
    }
  }

  get f() {
    return this.registerForm.controls;
  }
}
