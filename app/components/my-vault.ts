import { Component } from '@angular/core';
import { Vault} from '../services/vault'

@Component({
  selector: 'my-vault',
  template: `
    <h3>My vault</h3>
    <ul>
      <li class="header">
        <div>Username</div>
        <div>Password</div>
        <div>Website</div>
      </li>
      <li *ngFor="let row of vault">
        <div>{{ row.identity }}</div>
        <div class="password" [hidden]="row.showPass" (click)="row.showPass = true">********</div>
        <div class="password" [hidden]="!row.showPass" (click)="row.showPass = false">{{ row.credential }}</div>
        <div>{{ row.urlRaw }}</div>
      </li>
    </ul>
  `,
  styles: [
    `
    ul {
      margin: 0 0 2em 0;
      padding: 0;
      list-style: none;
    }

    li {
      width: 100%;
      overflow: auto;
    }

    .header {
      font-weight: bold;
      background: #369;
      color: #fff;
    }

    div {
      box-sizing: border-box;
      float: left;
      padding: 5px;
      width: 33.33%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    li:nth-child(odd):not(.header) {
      background: #eef6ff;
    }

    li:not(.header):hover {
      background: #eee;
    }

    .password {
      cursor: pointer;
      -webkit-user-select: none;
      -moz-user-select: none;
    }

    `
  ]
})

export class MyVaultComponent {
  public result;
  public vault;
  constructor(private vaultService: Vault) {
    this.result = this.vaultService.get()
    .subscribe(
      response => {
        this.vault = response._embedded.credential;
        this.result = response;
      });
  }
}