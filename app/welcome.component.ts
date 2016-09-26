import { Component } from '@angular/core';
import { User} from './services/user.service'


@Component({
  selector: 'my-app',
  template: `
    <h2>welcome {{ user.name }}</h2>
    <p>You should be logged in ;)</p>
    <hr />
    <my-vault><my-vault>
  `,
})

export class WelcomeComponent {
  that = this;
  public user;

  constructor(private userService: User) {
    this.user = this.userService.get()
    .subscribe(user => {this.user = user});
  }
}