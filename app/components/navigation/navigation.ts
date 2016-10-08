import {Component} from '@angular/core';
import {OAuth} from '../../services/oauth';
import {Router} from '@angular/router';

@Component({
    selector: 'ownpass-navigation',
    styleUrls: ['app/components/navigation/navigation.css'],
    templateUrl: 'app/components/navigation/navigation.html'
})

export class NavigationComponent {
    constructor(private oauth: OAuth, private router: Router) {
    }

    public logout = (event: Event) => {
        event.preventDefault();

        this.oauth.removeToken();
        this.router.navigateByUrl('login');
    }
}
