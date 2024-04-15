import { NotificationService } from './../../../../core/services/notification.service';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { AuthService, User } from '../../services/auth.service';
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
    let username = '';
    if (localStorage.getItem('user')) {
      username = JSON.parse(localStorage.getItem('user')).username;
    }
    this.buildForm(username);
  }

  buildForm(username?: string) {
    this.form = this.fb.group({
      username: [username ? username : '', [Validators.required]],
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
          let payload: User = {
            username: value.username,
            token: value.token,
          };
          this.authService.saveLogin(payload);
          this.router.navigate(['']);
          this.isLoading = false;
        },
        (error) => {
          if (error.status == '401')
            this.error = 'Incorrect username or password';
          else this.error = error.message;
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
