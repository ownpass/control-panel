import { Component } from '@angular/core';
import { User} from '../services/user';
import { Router } from '@angular/router';


@Component({
  selector: 'my-app',
  template: `
    <h2>Welcome {{ user.name }}!</h2>
    <hr />
    <my-navigation></my-navigation>
    <hr />
    <my-vault><my-vault>
  `,
})

export class WelcomeComponent {
  that = this;
  public user;

  constructor(private userService: User, private router: Router) {
    this.user = this.userService.get()
    .subscribe(
      user => {
        this.user = user
      },
      error => {
        if (error.status === 401) {
          this.router.navigateByUrl('login');
        }
      }
    );
  }
}