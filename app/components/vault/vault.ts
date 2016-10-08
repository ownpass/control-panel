import {Component} from '@angular/core';
import {Vault} from '../../services/vault'

@Component({
    selector: 'ownpass-vault',
    styleUrls: ['app/components/vault/vault.css'],
    templateUrl: 'app/components/vault/vault.html'
})

export class VaultComponent {
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
