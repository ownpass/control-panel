import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { OAuth } from './oauth.service';
import { LocalStorageToken } from '../interfaces/localstorage-token.interface';
import { Router } from '@angular/router';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class Vault {
    url: string = 'http://staging-api.ownpass.io/api/credential';
    constructor(private http: Http, private oAuth: OAuth, private router: Router) {}

    get = () => {
        let token: LocalStorageToken = this.oAuth.getToken();
        if (token.access_token === '') {
            return Observable.of({});
        }

        let headers = new Headers();
        headers.append('Authorization', token.token_type + ' ' + token.access_token);
        
        return this.http.get(this.url, {
            headers: headers,
        }).map(response => response.json());
    }
}