import {Component} from '@angular/core';
import {Vault} from '../../services/vault'
import {LS} from '../../services/localstorage';

@Component({
    selector: 'ownpass-vault',
    styleUrls: ['app/components/vault/vault.css'],
    templateUrl: 'app/components/vault/vault.html'
})

export class VaultComponent {
    public result;
    public vault;
    private localStorageKey:string = 'ownpassView';

    public getView = () => {
        let ls = this.ls.get(this.localStorageKey);
        return ls === 'grid';
    }

    public isGrid:boolean = this.getView();

    constructor(private vaultService: Vault, private ls: LS) {
        this.result = this.vaultService.get()
            .subscribe(
                response => {
                    this.vault = response._embedded.user_credential;
                    this.result = response;
                });
    }

    public toggleView = (event: Event) => {
        event.preventDefault();
        this.isGrid = !this.isGrid;
        this.ls.set(this.localStorageKey, this.isGrid ? 'grid' : 'list');
    }
}
