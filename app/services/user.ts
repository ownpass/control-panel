import {AccountInterface} from '../interfaces/account';
import {Http, Headers} from '@angular/http';
import {Injectable} from '@angular/core';
import {LocalStorageToken} from '../interfaces/localstorage-token';
import {OAuth} from './oauth';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';

@Injectable()
export class User {
    url: string = 'http://staging-api.ownpass.io/user';

    constructor(private http: Http, private oAuth: OAuth, private router: Router) {
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

    persist(account: AccountInterface) {
        let token: LocalStorageToken = this.oAuth.getToken();
        if (token.access_token === '') {
            this.router.navigateByUrl('login');
            return Observable.of({});
        }

        let headers = new Headers();
        headers.append('Authorization', token.token_type + ' ' + token.access_token);
        headers.append('Content-Type', 'application/vnd.own-pass-user.v1+json');

        return this.http.put(this.url, JSON.stringify(account), {
            headers: headers,
        }).map(response => response.json());
    }
}
