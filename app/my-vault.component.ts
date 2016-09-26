import { Component } from '@angular/core';
import { Vault} from './services/vault.service'

@Component({
  selector: 'my-vault',
  template: `
    <h3>My vault</h3>
    <p>Password</p>
    <ul>
      <li *ngFor="let row of vault">
        <p>Username: {{ row.identity }}</p>
        <p>URL: {{ row.urlRaw }}</p>
        <p>password: {{ row.credential }}</p>
      </li>
    </ul>
  `,
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