import {Component} from '@angular/core';
import {Account} from '../../services/account';

@Component({
    selector: 'ownpass-account',
    styleUrls: ['app/components/account/account.css'],
    templateUrl: 'app/components/account/account.html'
})

export class AccountComponent {
    that = this;
    public result;
    public accounts;

    constructor(private accountService: Account) {
        this.result = this.accountService.get()
            .subscribe(
                response => {
                    this.accounts = response._embedded.account;
                    this.result = response;
                });
    }
}
