import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  form: FormGroup;
  error: string = '';

  isLoading = false;
  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      passwordRepeat: ['', Validators.required],
    });
  }

  signin() {
    this.isLoading = true;
    this.error = '';
    this.authService
      .signin(this.form.value)
      .pipe(take(1))
      .subscribe(
        (value) => {
          let payload = {
            id: value.id,
            username: value.username,
            email: value.email,
            token: value.token,
          };
          localStorage.setItem('user', JSON.stringify(payload));
          this.authService.saveLogin(payload);
          this.router.navigate(['']);
          this.isLoading = false;
        },
        (error) => {
          this.error = error.error.error;
          this.isLoading = false;
        }
      );
  }

  verifyForm() {
    if (this.form.valid) {
      return this.form.value.password != this.form.value.passwordRepeat;
    }

    return true;
  }
}
