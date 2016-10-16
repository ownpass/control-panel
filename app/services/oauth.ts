import {Config} from "./config";
import {Credentials} from "../interfaces/credentials";
import {Http} from "@angular/http";
import {Injectable} from "@angular/core";
import {LS} from "./localstorage";
import {LocalStorageToken} from "../interfaces/localstorage-token";

@Injectable()
export class OAuth {
    private url: string = '/oauth';
    private localStorageKey: string = 'oauthToken';

    private token: LocalStorageToken = {
        access_token: '',
        expires_in: 0,
        refresh_token: '',
        token_type: '',
    };

    constructor(private config: Config,
                private http: Http,
                private ls: LS) {
    }

    public login = (user: Credentials) => {
        return this.http.post(this.config.getServerUrl() + this.url, {
            'grant_type': "password",
            'client_id': this.config.getClientId(),
            'username': user.username,
            'password': user.password
        });
    }

    public setToken = (response: string) => {
        this.ls.set(this.localStorageKey, response);
    }

    public removeToken = () => {
        this.ls.remove(this.localStorageKey);
    }

    public getToken = () => {
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
