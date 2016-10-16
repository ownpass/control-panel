import {Api} from "../services/api";
import {AccountInterface} from "../interfaces/account";
import {Injectable} from "@angular/core";

@Injectable()
export class User {
    url: string = '/user';

    constructor(private api: Api) {
    }

    get = () => {
        return this.api.get(this.url).map(
            response => response.json()
        );
    }

    persist(account: AccountInterface) {
        return this.api.put(this.url, account).map(
            response => response.json()
        );
    }
}
