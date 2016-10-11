import {AccountInterface} from '../interfaces/account';

export class AccountEntity implements AccountInterface {
    public static ROLE_ADMIN: string = 'admin';
    public static ROLE_USER: string = 'user';

    public static STATUS_ACTIVE: string = 'active';
    public static STATUS_INACTIVE: string = 'inactive';
    public static STATUS_INVITED: string = 'invited';

    id: string;
    name: string;
    email_address: string;
    role: string;
    status: string;
}
