import { Component } from '@angular/core';
import { User} from '../services/user';
import { Router } from '@angular/router';


@Component({
  selector: 'control-panel',
  template: `
    <div class="wrapper">
      <div class="heading">Ownpass</div>
      <h2>Welcome {{ user.name }}!</h2>
      <my-navigation></my-navigation>
      <my-vault></my-vault>
    </div>
  `,
  styleUrls: ['app/components/control-panel.css']
})

export class ControlPanelComponent {
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