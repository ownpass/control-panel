import {Component} from '@angular/core';
import {Router} from '@angular/router';
import { ListView } from '../../services/list-view';
import {Title} from '@angular/platform-browser';
import {User} from '../../services/user';

@Component({
    selector: 'ownpass-dashboard',
    styleUrls: ['app/components/dashboard/dashboard.css'],
    templateUrl: 'app/components/dashboard/dashboard.html'
})

export class DashboardComponent {
    that = this;
    public navigationStatus: boolean = false;
    public user;

    constructor(
        private userService: User,
        private router: Router,
        private title: Title,
        public view: ListView
    ) {
        title.setTitle('OwnPass Dashboard');

        this.user = this.userService.get()
        .subscribe(
            user => {
                this.user = user
            },
            error => {
                // TODO Http interceptor
                if (error.status === 401) {
                    this.router.navigateByUrl('login');
                }
                if (error.status === 403) {
                    //console.log('device');
                    this.router.navigateByUrl('device/inactive');
                }
            }
        );
        
    }

    public toggleNavigation = () => {
        this.navigationStatus = !this.navigationStatus;
    }
}
