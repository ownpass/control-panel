import {Component} from "@angular/core";
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {User} from '../../services/user';

@Component({
    selector: 'ownpass-account',
    styleUrls: ['app/components/profile/profile.css'],
    templateUrl: 'app/components/profile/profile.html'
})

export class ProfileComponent {
    that = this;
    public user;

    constructor(
        private userService: User,
        private router: Router,
        private title: Title
    ) {
        title.setTitle('OwnPass Profile');

        this.user = this.userService.get().subscribe(
            user => {
                this.user = user;
                console.log(user);
            },
            error => {
                if (error.status === 401) {
                    this.router.navigateByUrl('login');
                }
            }
        );
    }
}
