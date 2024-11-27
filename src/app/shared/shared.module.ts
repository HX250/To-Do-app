import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { RouterLinkActive, RouterModule } from '@angular/router';
import { AlertComponent } from './components/alert/alert.component';

@NgModule({
  declarations: [HeaderComponent, AlertComponent],
  imports: [CommonModule, RouterModule, RouterLinkActive],
  exports: [HeaderComponent, AlertComponent],
})
export class SharedModule {}
