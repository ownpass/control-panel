import {AccountInterface} from '../../interfaces/account';
import {Account} from '../../services/account';
import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';

@Component({
    selector: 'ownpass-account',
    styleUrls: ['app/components/account/account.css'],
    templateUrl: 'app/components/account/account.html'
})

export class AccountComponent {
    public result;
    public accounts;

    constructor(
        private accountService: Account,
        private router: Router,
        private title: Title
    ) {
        title.setTitle('OwnPass Accounts');

        this.result = this.accountService.get().subscribe(
            response => {
                this.accounts = response._embedded.account;
                this.result = response;
            }
        );
    }

    deleteAccount(account: AccountInterface): void {
        this.accountService.delete(account);
    }
}
