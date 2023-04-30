// ******************************************************************************* //
//                                                                                 //
//      Entry point of the program when the user decides to execute a command      //
//                                                                                 //
// ******************************************************************************* //

import { error_empty_param, error } from "./constants";
import { FileHelper, LoggerHelper, ConstraintHelper } from "./helpers";
import { Configuration } from "./models";

// ***** Retrieval of the arguments passed with a command (e.g: )
const parameters: string[] = process.argv.slice(2);

if (parameters.length == 0) LoggerHelper.log(error_empty_param, error);

// ***** Read of the configuration file ***** //
const config: Configuration = FileHelper.readConfigurationFile('./config.json', 'utf-8');

// ***** Object destructuring of parameters to extract environment & project names ***** //
const environment: string = parameters[0].toLocaleLowerCase();
const names: string[] = parameters.length > 1 ? parameters.slice(1).map(name => { return name.toLocaleLowerCase(); })
                                              : config.projects.map(project => { return project.name.toLocaleLowerCase(); });

// ***** Initial check of command arguments ***** //
ConstraintHelper.checkParameters(environment, names, config);

// ***** Initial check of configuration file content ***** //
ConstraintHelper.checkConfiguration(config);