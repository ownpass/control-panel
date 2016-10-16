import {AccountInterface} from '../interfaces/account';
import {Config} from './config';
import {Injectable} from '@angular/core';
import {LocalStorageToken} from '../interfaces/localstorage-token';
import {Http, Headers} from '@angular/http';
import {OAuth} from './oauth';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import {AccountEntity} from "../entity/account";

@Injectable()
export class Account {
    private url: string = '/account';

    constructor(private config: Config,
                private http: Http,
                private oAuth: OAuth,
                private router: Router) {
    }

    delete = (account: AccountInterface) => {
        let token: LocalStorageToken = this.oAuth.getToken();
        if (token.access_token === '') {
            this.router.navigateByUrl('login');

            return Observable.of({});
        }

        let headers = new Headers();
        headers.append('Authorization', token.token_type + ' ' + token.access_token);

        return this.http.delete(this.config.getServerUrl() + this.url + '/' + account.id, {
            headers: headers,
        }).map(response => response.json());
    }

    find = (id: string) => {
        let token: LocalStorageToken = this.oAuth.getToken();
        if (token.access_token === '') {
            this.router.navigateByUrl('login');

            return Observable.of({});
        }

        let headers = new Headers();
        headers.append('Authorization', token.token_type + ' ' + token.access_token);

        return this.http.get(this.config.getServerUrl() + this.url + '/' + id, {
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

        return this.http.get(this.config.getServerUrl() + this.url, {
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

        let result = null;

        if (account.id) {
            if (account.status === AccountEntity.STATUS_INVITED) {
                delete account.status;
            }

            result = this.http.put(this.config.getServerUrl() + this.url + '/' + account.id, JSON.stringify(account), {
                headers: headers,
            }).map(response => response.json());
        } else {
            result = this.http.post(this.config.getServerUrl() + this.url, JSON.stringify(account), {
                headers: headers,
            }).map(response => response.json());
        }

        return result;
    }
}
