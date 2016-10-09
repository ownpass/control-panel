import {AccountInterface} from '../interfaces/account';

export class AccountEntity implements AccountInterface {
    public static ROLE_ADMIN: string = 'admin';
    public static ROLE_USER: string = 'user';

    id: string;
    name: string;
    email_address: string;
    role: string;
}
