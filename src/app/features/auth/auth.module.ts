import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@NgModule({
  declarations: [LoginPageComponent, RegisterPageComponent],
  imports: [CommonModule, FormsModule, RouterLink, ReactiveFormsModule],
  exports: [LoginPageComponent, RegisterPageComponent],
})
export class AuthModule {}
