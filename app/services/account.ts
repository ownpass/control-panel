import {Api} from "../services/api";
import {AccountInterface} from "../interfaces/account";
import {Injectable} from "@angular/core";
import {AccountEntity} from "../entity/account";

@Injectable()
export class Account {
    private url: string = '/account';

    constructor(private api: Api) {
    }

    delete = (account: AccountInterface) => {
        return this.api.delete(this.url + '/' + account.id).map(
            response => response.json()
        );
    }

    find = (id: string) => {
        return this.api.get(this.url + '/' + id).map(
            response => response.json()
        );
    }

    get = () => {
        return this.api.get(this.url).map(
            response => response.json()
        );
    }

    persist(account: AccountInterface) {
        let result = null;

        if (account.id) {
            if (account.status === AccountEntity.STATUS_INVITED) {
                delete account.status;
            }

            result = this.api.put(this.url + '/' + account.id, account);
        } else {
            result = this.api.post(this.url, account);
        }

        return result.map(
            response => response.json()
        );
    }
}
