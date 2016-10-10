import {AccountInterface} from '../interfaces/account';

/**
 * The representation of an identity.
 */
export interface IdentityInterface {
    /**
     * The UUID4 id of the identity.
     */
    id: string;

    /**
     * The account to which the identity belongs to.
     */
    account: AccountInterface;

    /**
     * The directory where the identity is stored in.
     */
    directory: string;

    /**
     * The identity value.
     */
    identity: string;
}
