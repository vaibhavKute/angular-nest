import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';
  showHead = false;

  constructor(private router: Router){
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event['url'] === '/auth/login' || event['url'] === '/auth/sign-up' || event['url'] === '/' || event['url'] === '/login') {
          this.showHead = false;
        } else {
          this.showHead = true;
        }
      }
    })
  }
}
