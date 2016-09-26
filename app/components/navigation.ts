import { Component } from '@angular/core';

@Component({
  selector: 'my-navigation',
  template: `
    <nav>
      <a routerLink="/login" routerLinkActive="active">login</a>
      <a routerLink="/welcome" routerLinkActive="active">Secure page</a>
      <a routerLink="/fertert" routerLinkActive="active">404</a>
    </nav>
  `,
})

export class NavigationComponent {}