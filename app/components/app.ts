import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <h1>Ownpass</h1>
    <router-outlet></router-outlet>
    <my-navigation></my-navigation>
  `,
})

export class AppComponent {}