// ******************************************************************************* //
//                                                                                 //
//      Entry point of the program when the user decides to execute a command      //
//                                                                                 //
// ******************************************************************************* //

import { error_empty_param, error } from "./constants";
import { FileHelper, LoggerHelper, ConstraintHelper } from "./helpers";
import { Configuration, Credential, Project } from "./models";
import { buildDatabase, checkDatabaseExistence, clearDatabase, createDatabase, getCredential, getDatabaseInstance } from "./utils/query-function.js";
import { DatabaseHelper } from "./helpers/database-helper.js";
import { IResult } from "mssql";

main();

async function main() {

    // ***** Retrieval of the arguments passed with a command ***** //
    const parameters: string[] = process.argv.slice(2);

    if (parameters.length == 0) LoggerHelper.log(error_empty_param, error);

    // ***** Read of the configuration file ***** //
    const config: Configuration = await FileHelper.readConfigurationFile('./config.json', 'utf8');

    // ***** Object destructuring of parameters to extract environment & project names ***** //
    const environment: string = parameters[0].toLocaleLowerCase();
    const names: string[] = parameters.length > 1 ? parameters.slice(1).map(name => { return name.toLocaleLowerCase(); })
                                                : config.projects.map(project => { return project.name.toLocaleLowerCase(); });

    // ***** Filtering projects to only keep the project that has to be treated ***** //
    config.projects = config.projects.filter(project => names.includes(project.name))

    // ***** Initial check of command arguments ***** //
    await ConstraintHelper.checkParameters(environment, names, config);

    // ***** Initial check of configuration file content ***** //
    await ConstraintHelper.checkConfiguration(config);

    // ***** Rebuild of the projects asked by the user ***** //
    for (const project of config.projects) {

        // ***** Extract the credential corresponding to environment asked by the user ***** //
        const credential: Credential = await getCredential(project, environment);
            
        // ***** Get database instance for executing deletion of database if needed ***** //
        const neutral_instance: DatabaseHelper = await getDatabaseInstance(project, credential, "master");

        const data: IResult<any> = await checkDatabaseExistence(project, neutral_instance);

        // ***** Clear everything in order to have a blank SQL Server for the next step ***** //
        if (data.recordset.length > 0)
        {
            await clearDatabase(project, neutral_instance);
        }

        // ***** Creation of the database in order to execute all the script ***** //
        await createDatabase(project, neutral_instance);

        const project_instance: DatabaseHelper = await getDatabaseInstance(project, credential);

        // ***** Execution of all the scripts in order to have a fresh and usable database ***** //
        await buildDatabase(project, project_instance);
    }
}