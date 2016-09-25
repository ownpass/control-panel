import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { Credentials } from '../interfaces/credentials.interface';
import { LS } from './localstorage.service';

@Injectable()
export class OAuth {
    result: Object;
    url: string = 'http://staging-api.ownpass.io/oauth';
    localStorageKey: string = 'oauthToken';

    constructor(private http: Http, private ls: LS) {}

    login = (user: Credentials) => {
        return this.http.post(this.url, {
          username: user.username,
          password: user.password,
          'grant_type': "password",
          scope: "admin",
          'client_id': "chrome-extension"
        });
    }

    setToken  = (response: string) => {
      this.ls.set(this.localStorageKey, response);
    }
    
    getToken  = () => {
      this.ls.getJSON(this.localStorageKey);
    }
}