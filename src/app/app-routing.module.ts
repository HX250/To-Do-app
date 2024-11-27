import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './features/auth/login-page/login-page.component';
import { RegisterPageComponent } from './features/auth/register-page/register-page.component';
import { TodoPageComponent } from './features/todo/todo-page.component';
import { TodoCreateComponent } from './features/todo/todo-create/todo-create.component';
import { TodoShowComponent } from './features/todo/todo-show/todo-show.component';
import { authGuard } from './core/guards/auth/auth.guard';
import { loginGuard } from './core/guards/login/login.guard';

const routes: Routes = [
  { path: '', component: LoginPageComponent, canActivate: [loginGuard] },
  {
    path: 'register',
    component: RegisterPageComponent,
    canActivate: [loginGuard],
  },
  {
    path: 'todo',
    component: TodoPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'create',
        pathMatch: 'full',
      },
      {
        path: 'create',
        component: TodoCreateComponent,
      },
      { path: 'show', component: TodoShowComponent },
    ],
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
export const routingComponent = [LoginPageComponent];
