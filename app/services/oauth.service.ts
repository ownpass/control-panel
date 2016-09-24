import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { Credentials } from '../interfaces/credentials.interface';

@Injectable()
export class OAuth {
    result: Object;
    url: string = 'http://staging-api.ownpass.io/oauth'; //'http://staging-api.ownpass.io/oauth'

    constructor(private http: Http) {}

    login = (user: Credentials) => {
        return this.http.post(this.url, {
          username: user.username,
          password: user.password,
          'grant_type': "password",
          scope: "admin",
          'client_id': "chrome-extension"
        });
    }
}