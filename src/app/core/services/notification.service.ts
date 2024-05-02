import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface NotificationData {
  severity: string;
  summary: string;
  detail?: string;
  sticky?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  notification = new BehaviorSubject(null);

  constructor() {}

  add(data: NotificationData) {
    this.notification.next(data);
  }

  get() {
    return this.notification;
  }
}
