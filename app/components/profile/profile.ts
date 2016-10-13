import {AccountEntity} from '../../entity/account';
import {AccountInterface} from '../../interfaces/account';
import {Component, OnInit} from "@angular/core";
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {User} from '../../services/user';

@Component({
    selector: 'ownpass-account',
    styleUrls: ['app/components/dashboard/dashboard.css'],
    templateUrl: 'app/components/profile/profile.html'
})

export class ProfileComponent implements OnInit {
    public account: AccountInterface;
    public errors: any[];
    public submitted: boolean;
    public navigationStatus: boolean = false; // TODO <---- fix this

    constructor(
        private userService: User,
        private router: Router,
        private title: Title
    ) {
        this.title.setTitle('OwnPass Profile');

        this.submitted = false;

        this.account = new AccountEntity();
    }

    ngOnInit(): void {
        this.userService.get().subscribe(
            user => {
                this.account = user;
                console.log(user);
            },
            error => {
                if (error.status === 401) {
                    this.router.navigateByUrl('login');
                }
            }
        );
    }

    onSubmit(): void {
        this.errors = null;

        this.userService.persist(this.account).subscribe(
            response => {
                this.account = response;
                this.submitted = true;
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


    // TODO Fix this
    public toggleNavigation = () => {
        this.navigationStatus = !this.navigationStatus;
    }
}
