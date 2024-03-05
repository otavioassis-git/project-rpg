import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  showPassword = false;
  error: string = '';

  form: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  login() {
    this.authService
      .login(this.form.value)
      .pipe(take(1))
      .subscribe(
        (value) => {
          this.error = '';
          let payload = { email: value.email, token: value.token };
          this.authService.saveLogin(payload);
          this.router.navigate(['']);
        },
        (error) => {
          this.error = error.error.error;
        }
      );
  }

  verifyForm() {
    return !this.form.valid;
  }
}
