import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {User} from '../../services/user';

@Component({
    selector: 'ownpass-dashboard',
    styleUrls: ['app/components/dashboard/dashboard.css'],
    templateUrl: 'app/components/dashboard/dashboard.html'
})

export class DashboardComponent {
    that = this;
    public user;

    constructor(
        private userService: User,
        private router: Router,
        private title: Title
    ) {
        title.setTitle('OwnPass Dashboard');

        this.user = this.userService.get()
            .subscribe(
                user => {
                    this.user = user
                },
                error => {
                    if (error.status === 401) {
                        this.router.navigateByUrl('login');
                    }
                }
            );
    }
}
