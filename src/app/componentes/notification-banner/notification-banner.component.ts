import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-notification-banner',
  templateUrl: './notification-banner.component.html',
  styleUrls: ['./notification-banner.component.css'],
  animations: [
    trigger('bannerState', [
      state('void', style({
        transform: 'translateY(-100%)',
        opacity: 0
      })),
      state('visible', style({
        transform: 'translateY(0)',
        opacity: 1
      })),
      transition('void => visible', animate('300ms ease-out')),
      transition('visible => void', animate('200ms ease-in'))
    ])
  ]
})
export class NotificationBannerComponent implements OnInit {
  @Input() message: string = '';
  @Input() targetUrl: string = '';
  @Input() imageUrl: string = '';
  isVisible = true;
  animationState = 'visible';

  constructor(private router: Router) { }

  ngOnInit() {
    this.animationState = 'visible';
  }

  handleClick() {
    if (this.targetUrl.startsWith('http')) {
      window.location.href = this.targetUrl;
    } else {
      this.router.navigate([this.targetUrl]);
    }
  }

  close(event: Event) {
    event.stopPropagation();
    this.animationState = 'void';
    setTimeout(() => {
      this.isVisible = false;
    }, 200);
  }
}