import {AccountInterface} from '../interfaces/account';
import {IdentityInterface} from '../interfaces/identity';

export class IdentityEntity implements IdentityInterface {
    id: string;
    account: AccountInterface;
    directory: string;
    identity: string;
}
