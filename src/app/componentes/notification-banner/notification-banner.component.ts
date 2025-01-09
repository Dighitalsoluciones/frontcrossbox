import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notification-banner',
  templateUrl: './notification-banner.component.html',
  styleUrls: ['./notification-banner.component.css']
})
export class NotificationBannerComponent {

  @Input() message: string = '';
  @Input() targetUrl: string = '';
  @Input() imageUrl: string = '';
  isVisible = true;

  constructor(private router: Router) { }

  handleClick() {
    if (this.targetUrl.startsWith('http')) {
      window.location.href = this.targetUrl;
    } else {
      this.router.navigate([this.targetUrl]);
    }
  }

  close(event: Event) {
    event.stopPropagation();
    this.isVisible = false;
  }
}