import { NotificationService } from './../../../../core/services/notification.service';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { resolve } from 'path';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  showPassword = false;
  error: string = '';

  form: FormGroup;

  isLoading = false;
  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    let email = '';
    if (localStorage.getItem('user')) {
      email = JSON.parse(localStorage.getItem('user')).email;
    }
    this.buildForm(email);
  }

  buildForm(email?: string) {
    this.form = this.fb.group({
      email: [email ? email : '', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  login() {
    this.isLoading = true;
    this.error = '';
    this.authService
      .login(this.form.value)
      .pipe(take(1))
      .subscribe(
        (value) => {
          let payload = {
            id: value.id,
            username: value.username,
            email: value.email,
            token: value.token,
          };
          this.authService.saveLogin(payload);
          localStorage.setItem('user', JSON.stringify(payload));
          this.router.navigate(['']);
          this.isLoading = false;
        },
        (error) => {
          this.error = error.error.error;
          this.isLoading = false;
        }
      );
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  verifyForm() {
    return !this.form.valid;
  }
}
