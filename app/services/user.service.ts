import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { OAuth } from './oauth.service';
import { LocalStorageToken } from '../interfaces/localstorage-token.interface';
import 'rxjs/Rx';

@Injectable()
export class User {
    url: string = 'http://staging-api.ownpass.io/api/user';

    constructor(private http: Http, private oAuth: OAuth) {}

    get = () => {
        let token: LocalStorageToken = this.oAuth.getToken();
        let headers = new Headers();
        headers.append('Authorization', token.token_type + ' ' + token.access_token);
        
        return this.http.get(this.url, {
            headers: headers,
        }).map(response => response.json());
    }
}