import {Config} from "./config";
import {Injectable} from "@angular/core";
import {LocalStorageToken} from "../interfaces/localstorage-token";
import {Http, Headers} from "@angular/http";
import {OAuth} from "./oauth";
import {Observable} from "rxjs/Observable";
import {Router} from "@angular/router";

@Injectable()
export class Device {
    constructor(private config: Config,
                private http: Http,
                private oAuth: OAuth,
                private router: Router) {
    }

    activate = (code: string) => {
        let token: LocalStorageToken = this.oAuth.getToken();

        if (token.access_token === '') {
            this.router.navigateByUrl('login');

            return Observable.of({});
        }

        let headers = new Headers();
        headers.append('Authorization', token.token_type + ' ' + token.access_token);
        headers.append('Content-Type', 'application/json');

        return this.http.post(this.config.getServerUrl() + '/device/activate', JSON.stringify({
            'code': code
        }), {
            headers: headers,
        }).map(response => response.json());
    }

    create = (name: string, description: string) => {
        let token: LocalStorageToken = this.oAuth.getToken();

        if (token.access_token === '') {
            this.router.navigateByUrl('login');

            return Observable.of({});
        }

        let headers = new Headers();
        headers.append('Authorization', token.token_type + ' ' + token.access_token);
        headers.append('Content-Type', 'application/json');

        return this.http.post(this.config.getServerUrl() + '/device', JSON.stringify({
            'name': name,
            'description': description
        }), {
            headers: headers,
        }).map(response => response.json());
    }
}
