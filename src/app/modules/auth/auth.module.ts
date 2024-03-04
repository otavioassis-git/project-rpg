import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { SigninComponent } from './pages/signin/signin.component';

@NgModule({
  declarations: [LoginComponent, SigninComponent],
  imports: [CommonModule, AuthRoutingModule],
})
export class AuthModule {}
