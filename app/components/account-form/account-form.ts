import {Account} from '../../services/account';
import {AccountInterface} from '../../interfaces/account';
import {ActivatedRoute, Params} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'ownpass-account-form',
    styleUrls: ['app/components/account-form/account-form.css'],
    templateUrl: 'app/components/account-form/account-form.html'
})

export class AccountFormComponent implements OnInit {
    public isEdit: boolean;
    public account: AccountInterface;

    constructor(
        private accountService: Account,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.isEdit = false;
    }

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            let id = params['id'];

            if (id) {
                this.isEdit = true;

                this.accountService.find(id).subscribe(
                    response => {
                        this.account = response;
                    },
                    error => {
                        if (error.status === 401) {
                            this.router.navigateByUrl('login');
                        }
                    }
                );
            }
        });
    }
}
