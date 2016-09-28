import { Component } from '@angular/core';

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
    </ul>
  `,
  styleUrls: ['app/components/navigation.css']
})

export class NavigationComponent {}