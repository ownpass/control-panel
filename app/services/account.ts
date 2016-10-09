import {AccountInterface} from '../interfaces/account';
import {Injectable} from '@angular/core';
import {LocalStorageToken} from '../interfaces/localstorage-token';
import {Http, Headers} from '@angular/http';
import {OAuth} from './oauth';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';

@Injectable()
export class Account {
    url: string = 'http://staging-api.ownpass.io/account';

    constructor(
        private http: Http,
        private oAuth: OAuth,
        private router: Router
    ) {
    }

    delete = (account: AccountInterface) => {
        console.log('Deleting', account);
    }

    find = (id: string) => {
        let token: LocalStorageToken = this.oAuth.getToken();
        if (token.access_token === '') {
            this.router.navigateByUrl('login');

            return Observable.of({});
        }

        let headers = new Headers();
        headers.append('Authorization', token.token_type + ' ' + token.access_token);

        return this.http.get(this.url + '/' + id, {
            headers: headers,
        }).map(response => response.json());
    }

    get = () => {
        let token: LocalStorageToken = this.oAuth.getToken();
        if (token.access_token === '') {
            this.router.navigateByUrl('login');

            return Observable.of({});
        }

        let headers = new Headers();
        headers.append('Authorization', token.token_type + ' ' + token.access_token);

        return this.http.get(this.url, {
            headers: headers,
        }).map(response => response.json());
    }
}
