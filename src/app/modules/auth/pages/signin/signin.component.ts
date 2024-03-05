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
    this.authService
      .signin(this.form.value)
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
    if (this.form.valid) {
      return this.form.value.password != this.form.value.passwordRepeat;
    }

    return true;
  }
}
