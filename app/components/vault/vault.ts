import { Component, Input } from '@angular/core';
import { Vault } from '../../services/vault'
import { ListView } from '../../services/list-view';

@Component({
    selector: 'ownpass-vault',
    styleUrls: ['app/components/vault/vault.css'],
    templateUrl: 'app/components/vault/vault.html'
})

export class VaultComponent {
    @Input() editCredential;

    public result;
    public vault;
    
    constructor(private vaultService: Vault, public view: ListView) {
        this.result = this.vaultService.get()
            .subscribe(
                response => {
                    this.vault = response._embedded.user_credential;
                    this.result = response;
                });
    }

}
