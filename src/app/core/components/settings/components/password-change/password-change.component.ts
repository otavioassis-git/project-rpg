import { NotificationService } from './../../../../services/notification.service';
import { AuthService } from './../../../../../modules/auth/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { take } from 'rxjs';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.scss'],
})
export class PasswordChangeComponent implements OnInit {
  form: FormGroup;
  showPassword: boolean[] = [false, false];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private ref: DynamicDialogRef,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(3)]],
      newPassword: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  changePassword() {
    this.authService
      .changePassword(this.form.value)
      .pipe(take(1))
      .subscribe(
        (value) => {
          this.notificationService.add({
            severity: 'success',
            summary: 'Your password has been updated!',
          });
          this.ref.close();
        },
        (error) => {
          this.notificationService.add({
            severity: 'error',
            summary: 'Error on password update',
            detail: 'Test your internet connection and try again',
          });
        }
      );
  }

  toggleShowPassword(idx: number) {
    this.showPassword[idx] = !this.showPassword[idx];
  }

  verifyForm() {
    if (this.form.valid) {
      return this.form.value.password == this.form.value.newPassword;
    }

    return true;
  }
}
