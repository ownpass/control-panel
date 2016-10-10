import {Account} from '../../services/account';
import {AccountEntity} from '../../entity/account';
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
    public identity: string;
    public credential: string;
    public roles: any[];
    public errors: any[];
    public submitted: boolean;

    constructor(
        private accountService: Account,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.isEdit = false;
        this.submitted = false;

        this.roles = [
            {
                'key': AccountEntity.ROLE_ADMIN,
                'label': 'Admin'
            },
            {
                'key': AccountEntity.ROLE_USER,
                'label': 'User'
            }
        ];

        this.account = new AccountEntity();
        this.account.role = AccountEntity.ROLE_USER;
    }

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            let id = params['id'];

            if (id) {
                this.isEdit = true;

                /*this.accountService.find(id).subscribe(
                    response => {
                        this.account = response;
                    },
                    error => {
                        if (error.status === 401) {
                            this.router.navigateByUrl('login');
                        }
                    }
                );*/
            }
        });
    }

    buildErrors(messages: any): any {
        let result = {};

        Object.keys(messages).map(function(key) {
            result[key] = [];

            Object.keys(messages[key]).map(function(error) {
                result[key].push(messages[key][error]);
            });
        });

        return result;
    }

    onSubmit(): void {
        this.errors = null;

        let persistIdentity = function() {

        };

        this.accountService.persist(this.account).subscribe(
            response => {
                console.log(response);

                //this.submitted = true;
            },
            error => {
                if (error.status === 401) {
                    this.router.navigateByUrl('login');
                } else if (error.status === 422) {
                    let json: any = error.json();

                    this.errors = this.buildErrors(json.validation_messages);
                }
            }
        );
    }
}
