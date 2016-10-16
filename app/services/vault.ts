import {Api} from "./api";
import {Injectable} from "@angular/core";
import "rxjs/Rx";

@Injectable()
export class Vault {
    private url: string = '/user/credential';

    constructor(private api: Api) {
    }

    get = () => {
        return this.api.get(this.url).map(
            response => response.json()
        );
    }
}
