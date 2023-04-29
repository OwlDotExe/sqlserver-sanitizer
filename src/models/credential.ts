/**
 * @interface
 * @description     Interface that represents the structure of a Credential object.
 */
export interface ICredential {

    /**
     * @field   Environment where the script will be executed.
     */
    environment: string;

    /**
     * @field   Username of the account to use for connection purpose.
     */
    username: string;

    /**
     * @field   Password of the account to use for connection purpose.
     */
    password: string;
}


/**
 * @class
 * @classdesc       Class that contains all the information of a credential object.
 */
export class Credential {

    public environment: string;
    public username: string;
    public password: string;

    /**
     * @constructor
     * @param           data => Data read or retrieved from an external source.
     */
    constructor(data: ICredential) {

        this.environment = data.environment;
        this.username = data.username;
        this.password = data.password;
    }
}