import { Component } from '@angular/core';
import { OAuth } from '../services/oauth';
import { Router } from '@angular/router';

@Component({
  selector: 'my-navigation',
  template: `
    <ul>
      <li>
        <a routerLink="/login" routerLinkActive="active">Login</a>
      </li>
      <li>
        <a routerLink="/control-panel" routerLinkActive="active">Control panel</a>
      </li>
      <li>
        <a routerLink="/fertert" routerLinkActive="active">404</a>
      </li>
      <li>
        <a (click)="logout($event)" href="#">Logout</a>
      </li>
    </ul>
  `,
  styleUrls: ['app/components/navigation.css']
})

export class NavigationComponent {
  constructor(private oauth: OAuth, private router: Router) {}
  public logout = (event: Event) => {
    event.preventDefault();
    this.oauth.removeToken();
    this.router.navigateByUrl('login');
  }
}