// ******************************************************************************* //
//                                                                                 //
//      Entry point of the program when the user decides to execute a command      //
//                                                                                 //
// ******************************************************************************* //

import { FileHelper } from "./helpers/file-helper.js";
import { Configuration } from "./models/configuration.js";

const parameters: string[] = process.argv.slice(2);

const config: Configuration = FileHelper.readConfigurationFile('./config.json', 'utf-8');

console.log("params => ", parameters);
console.log("configuration => ", config);