import {Config} from "./config";
import {Http, Headers} from '@angular/http';
import {Injectable} from "@angular/core";
import {LocalStorageToken} from "../interfaces/localstorage-token";
import {LS} from "./localstorage";
import {OAuth} from "./oauth";
import {Observable} from "rxjs/Observable";
import {Router} from "@angular/router";

@Injectable()
export class Api {
    constructor(private config: Config,
                private http: Http,
                private oAuth: OAuth,
                private router: Router,
                private localStorage: LS) {
    }

    getDeviceId(): string {
        return this.localStorage.get('device-id');
    }

    setDeviceId(id: string): void {
        this.localStorage.set('device-id', id);
    }

    buildHeaders(token: LocalStorageToken): Headers {
        let headers = new Headers();
        headers.append('Authorization', token.token_type + ' ' + token.access_token);
        headers.append('Content-Type', 'application/json');

        let deviceId = this.getDeviceId();
        if (deviceId) {
            headers.append('X-OwnPass-Device', deviceId);
        }

        return headers;
    }

    delete(path: string) {
        let token: LocalStorageToken = this.oAuth.getToken();

        if (token.access_token === '') {
            this.router.navigateByUrl('login');

            return Observable.of({});
        }

        let headers = this.buildHeaders(token);

        return this.http.delete(this.config.getServerUrl() + path, {
            headers: headers
        });
    }

    get = (path: string) => {
        let token: LocalStorageToken = this.oAuth.getToken();

        if (token.access_token === '') {
            this.router.navigateByUrl('login');

            return Observable.of({});
        }

        let headers = this.buildHeaders(token);

        return this.http.get(this.config.getServerUrl() + path, {
            headers: headers
        });
    }

    post = (path: string, params: any) => {
        let token: LocalStorageToken = this.oAuth.getToken();

        if (token.access_token === '') {
            this.router.navigateByUrl('login');

            return Observable.of({});
        }

        let headers = this.buildHeaders(token);

        return this.http.post(this.config.getServerUrl() + path, JSON.stringify(params), {
            headers: headers
        });
    }

    put = (path: string, params: any) => {
        let token: LocalStorageToken = this.oAuth.getToken();

        if (token.access_token === '') {
            this.router.navigateByUrl('login');

            return Observable.of({});
        }

        let headers = this.buildHeaders(token);

        return this.http.put(this.config.getServerUrl() + path, JSON.stringify(params), {
            headers: headers
        });
    }
}
