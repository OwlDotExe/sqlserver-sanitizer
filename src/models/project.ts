import { Credential, ICredential } from "./credential.js";

/**
 * @interface
 * @description     Interface that represents the structure of a Project object.
 */
export interface IProject {

    /**
     * @field   Project name.
     */
    name: string;

    /**
     * @field   Instance name in SQL Server.
     */
    instance_name: string;

    /**
     * @field   Database name used in SQL Server.
     */
    database_name: string;

    /**
     * @field   Array of potential credentials used for executing query in SQL Server.
     */
    credentials: ICredential[];
}


/**
 * @class
 * @classdesc       Class that contains all the information of a Project object.
 */
export class Project {

    public name: string;
    public instance_name: string;
    public database_name: string;
    public credentials: Credential[];

    /**
     * @constructor
     * @param           data => Data read or retrieved from an external source.
     */
    constructor(data: IProject) {

        this.name = data.name;
        this.instance_name = data.instance_name;
        this.database_name = data.database_name;
        this.credentials = data.credentials && data.credentials.length >= 1 ? data.credentials.map(credential => new Credential(credential)) : [];
    }
}