import {Component, Input} from '@angular/core';
import {OAuth} from '../../services/oauth';
import {Router} from '@angular/router';

@Component({
    selector: 'ownpass-navigation',
    styleUrls: ['app/components/navigation/navigation.css'],
    templateUrl: 'app/components/navigation/navigation.html'
})

export class NavigationComponent {
    @Input() toggleNavigation;
    @Input() navigationStatus;

    constructor(private oauth: OAuth, private router: Router) {
    }

    public logout = (event: Event) => {
        event.preventDefault();

        this.oauth.removeToken();
        this.router.navigateByUrl('login');
    }

    public collapse = (event: Event) => {
        event.preventDefault();
        this.toggleNavigation();
    }


}
