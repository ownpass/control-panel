import { Component } from '@angular/core';
import { User} from '../services/user'


@Component({
  selector: 'my-app',
  template: `
    <h2>Welcome {{ user.name }}!</h2>
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