import { IResult, config } from "mssql";
import os from "os";
import { error_credential_match, error_database_retrieval } from "../constants/error-constant.js";
import { error, success } from "../constants/status-constant.js";
import { DatabaseHelper } from "../helpers/database-helper.js";
import { LoggerHelper } from "../helpers/logger-helper.js";
import { Credential } from "../models/credential.js";
import { Project } from "../models/project.js";
import chalk, { Chalk } from "chalk";

const accentuated: Chalk = chalk.bold;

/**
 * @function
 * @description             Function that gets the credential corresponding to the environment asked by the user.
 * @param                   project => The project that has to be build again.
 * @param                   environment => The development environment asked by the user.
 * @returns                 Object that contains sensitive information for database manipulation.
 */
export async function getCredential(project: Project, environment: string) : Promise<Credential> {

    var credential: Credential = project.credentials.find(credential => credential.environment == environment);

    if (!credential) LoggerHelper.log(error_credential_match, error);

    return credential;
}

/**
 * @function
 * @description             Function that builds a configuration and get a database instance that uses this configuration.
 * @param                   project => The project that has to be build again.
 * @param                   credential => The object that contains all the sensitive data.
 * @param                   database => Potential database name for command that needs an external database in order to be executed.
 * @returns                 Database instance that can be used for executing queries.
 */
export async function getDatabaseInstance(project: Project, credential: Credential, database?: string) : Promise<DatabaseHelper> {

    var config: config = {
        user: `${credential.username}`,
        password: `${credential.password}`,
        server: `${os.hostname()}\\${project.instance_name}`,
        database: database ? database : `${project.database_name}`,
        options: {
            trustServerCertificate: true
        }
    };

    return DatabaseHelper.getInstance(config, true);
}

/**
 * @function
 * @description             Function that clears the content of a database.
 * @param                   project => The project that has to be build again.
 * @param                   instance => Database instance that can be used for executing queries.
 */
export async function clearDatabase(project: Project, instance: DatabaseHelper) : Promise<void> {

    await connectSQLServer(project, instance);

    const data: IResult<any> = await checkDatabaseExistence(project, instance);

    if (data.recordset.length > 0)
    {
        await deleteDatabase(project, instance);
    }

    await exitSQLServer(project, instance);
}

/**
 * @function
 * @description             Function that connects a user to a database.
 * @param                   project => The project that has to be build again.
 * @param                   instance => Database instance that can be used for executing queries.
 */
export async function connectSQLServer(project: Project, instance: DatabaseHelper) : Promise<void> {

    try {
        await instance.connect();

        LoggerHelper.log(`The connection to the instance ${accentuated(project.instance_name)} has been established successfully.`, success);
    }
    catch (err) {
        LoggerHelper.log(`An error occured... The connection to the instance ${accentuated(project.instance_name)} couldn't be established successfully.`, error);
    }
}

/**
 * @function
 * @description             Function that closes an existing connection.
 * @param                   project => The project that has to be build again.
 * @param                   instance => Database instance that can be used for executing queries.
 */
export async function exitSQLServer(project: Project, instance: DatabaseHelper) : Promise<void> {

    try {
        await instance.close();

        LoggerHelper.log(`The connection to the intance ${accentuated(project.instance_name)} has been closed successfully.`, success);
    }
    catch (err) {
        LoggerHelper.log(`An error occured... The connection to the instance ${accentuated(project.instance_name)} couldn't be closed successfully.`, error);
    }
}

/**
 * @function
 * @description             Function that executes a query to know if the database still exists or not.
 * @param                   project => The project that has to be build again.
 * @param                   instance => Database instance that can be used for executing queries.
 * @returns                 The result of the execution of the query.
 */
export async function checkDatabaseExistence(project: Project, instance: DatabaseHelper) : Promise<IResult<any>> {

    try {
        const query: string = `SELECT database_id FROM sys.databases WHERE name = '${project.database_name}'`;

        return await instance.executeQuery(query);
    }
    catch (err) {
        LoggerHelper.log(error_database_retrieval, error);
    }
}


/**
 * @function
 * @description             Function that deletes the database.
 * @param                   project => The project that has to be build again.
 * @param                   instance => Database instance that can be used for executing queries.
 */
export async function deleteDatabase(project: Project, instance: DatabaseHelper) : Promise<void> {

    try {
        const query: string = `DROP DATABASE ${project.database_name};`;

        await instance.executeQuery(query);

        LoggerHelper.log(`The database ${accentuated(project.database_name)} has been deleted successfully.`, success);
    }
    catch (err) {
        LoggerHelper.log(`An error occured... The database ${accentuated(project.database_name)} hasn't been deleted.`, error);
    }
}