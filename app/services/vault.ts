import {Config} from './config';
import {Http, Headers} from '@angular/http';
import {Injectable} from '@angular/core';
import {LocalStorageToken} from '../interfaces/localstorage-token';
import {OAuth} from './oauth';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class Vault {
    private url: string = '/user/credential';

    constructor(private config: Config,
                private http: Http,
                private oAuth: OAuth) {
    }

    get = () => {
        let token: LocalStorageToken = this.oAuth.getToken();
        if (token.access_token === '') {
            return Observable.of({});
        }

        let headers = new Headers();
        headers.append('Authorization', token.token_type + ' ' + token.access_token);

        return this.http.get(this.config.getServerUrl() + this.url, {
            headers: headers,
        }).map(response => response.json());
    }
}
