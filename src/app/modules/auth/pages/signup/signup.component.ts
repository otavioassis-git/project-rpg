import { AuthService, User } from '../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
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
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(3)]],
      passwordRepeat: ['', Validators.required],
    });
  }

  signup() {
    this.isLoading = true;
    this.error = '';
    this.authService
      .signup(this.form.value)
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
