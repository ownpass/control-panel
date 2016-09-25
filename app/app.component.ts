import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <h1>Ownpass</h1>
    <router-outlet></router-outlet>
    <nav>
      <a routerLink="/login" routerLinkActive="active">login</a>
      <a routerLink="/fertert" routerLinkActive="active">404</a>
    </nav>
  `,
})

export class AppComponent { }