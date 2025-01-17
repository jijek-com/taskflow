import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent {
  title = 'taskflow';
  isCollapsed = false;

  constructor(private router: Router) {}

  isCurrentRoute(route: string): boolean {
    return this.router.isActive(route, true);
  }
}
