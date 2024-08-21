import { Component, ElementRef, ViewChild } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss',
})
export class NotificationComponent {
  @ViewChild('container') container!: ElementRef;

  constructor(private _notificationService: NotificationService) {}

  public get show() {
    return this._notificationService.show;
  }

  public get color() {
    return this._notificationService.color;
  }

  public get message() {
    return this._notificationService.message;
  }
}
