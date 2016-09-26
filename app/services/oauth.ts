import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { Credentials } from '../interfaces/credentials.interface';
import { LS } from './localstorage.service';
import { LocalStorageToken } from '../interfaces/localstorage-token.interface';

@Injectable()
export class OAuth {
    result: Object;
    url: string = 'http://staging-api.ownpass.io/oauth';
    localStorageKey: string = 'oauthToken';
    
    private token: LocalStorageToken = {
      access_token: '',
      expires_in: 0,
      refresh_token: '',
      token_type: '',
    };

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

    removeToken = () => {
      this.ls.remove(this.localStorageKey);
    }
    
    getToken  = () => {
      let t = this.ls.getJSON(this.localStorageKey);
      
      if (t !== null && t.access_token && t.expires_in && t.refresh_token && t.token_type) {
        this.token = {
          access_token: t.access_token,
          expires_in: t.expires_in,
          refresh_token: t.refresh_token,
          token_type: t.token_type,
        }
      }

      return this.token;
    }
}