import { AccountInterface } from '../../interfaces/account';
import { AccountEntity } from '../../entity/account';
import { Account } from '../../services/account';
import { Component } from '@angular/core';
import { ListView } from '../../services/list-view';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'ownpass-account',
    styleUrls: [
        'app/components/dashboard/dashboard.css',
        'app/components/account/account.css'
    ],
    templateUrl: 'app/components/account/account.html'
})

export class AccountComponent {
    public result;
    public accounts;
    public navigationStatus: boolean = false; // TODO <---- fix this

    constructor(
        private accountService: Account,
        private router: Router,
        private title: Title,
        public view: ListView
    ) {
        title.setTitle('OwnPass Accounts');

        this.accountService.get().subscribe(
            response => {
                this.accounts = this.updateAccountValues(response._embedded.account);
                this.result = response;
            }
        );
    }

    updateAccountValues(accounts: AccountInterface[]): AccountInterface[] {
        accounts.forEach(function(account) {
            switch (account.role) {
                case AccountEntity.ROLE_ADMIN:
                    account.role = 'Admin';
                    break;

                case AccountEntity.ROLE_USER:
                    account.role = 'User';
                    break;

                default:
                    throw 'Invalid account role provided.';
            }

            switch (account.status) {
                case AccountEntity.STATUS_ACTIVE:
                    account.status = 'Active';
                    break;

                case AccountEntity.STATUS_INACTIVE:
                    account.status = 'Inactive';
                    break;

                case AccountEntity.STATUS_INVITED:
                    account.status = 'Invited';
                    break;

                default:
                    throw 'Invalid account status provided.';
            }
        });
        return accounts;
    }

    deleteAccount(account: AccountInterface): void {
        this.accountService.delete(account).subscribe(
            response => {
                console.log(account);
                console.log(response);

                // TODO: Remove the row from HTML
            }
        );
    }

    getStatusIcon(account: AccountInterface) {
        var icons = {
            'Active': 'done',
            'Inactive': 'block',
            'Invited': 'mail_outline',
        };
        if (account.status !== undefined) {
            return icons[account.status];
        } else {
            return 'help_outline';
        }

        
    }

    // TODO Fix this
    public toggleNavigation = () => {
        this.navigationStatus = !this.navigationStatus;
    }
}
