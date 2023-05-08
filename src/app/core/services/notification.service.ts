import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  notification = new BehaviorSubject(null);

  constructor() {}

  add(data) {
    this.notification.next(data);
  }

  get() {
    return this.notification;
  }
}
