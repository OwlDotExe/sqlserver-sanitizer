import * as fs from "fs";
import { Configuration, IConfiguration } from "../models/configuration.js";
import { LoggerHelper } from "./logger-helper.js";
import { sucess_config_read } from "../constants/sucess-constant.js";
import { error, success } from "../constants/status-constant.js";
import { error_config_empty, error_config_read } from "../constants/error-constant.js";
import chalk, { Chalk } from "chalk";


/**
 * @class
 * @classdesc   Static helper used for file management purposes.
 */
export class FileHelper {

    private static accentuated: Chalk = chalk.bold;

    /**
     * @method
     * @description         Method that reads the content of the configuration file and converts content in configuration object.
     * @param               path => The location of the file to read.
     * @param               encoding => Information about encoding if needed.
     * @returns             The object representation of the configuratin file.
     */
    public static readConfigurationFile(path: string, encoding?: BufferEncoding) : Configuration {

        try {
            const config: Configuration = new Configuration(<IConfiguration>JSON.parse(fs.readFileSync(path, encoding)));

            LoggerHelper.log(sucess_config_read, success);

            if (config.projects.length == 0) LoggerHelper.log(error_config_empty, error);

            return config;
        }
        catch(err) {
            LoggerHelper.log(error_config_read, error);
        }
    }

    /**
     * @method
     * @description         Method that reads the content of a sql script file.
     * @param               path => The location of the file to read.
     * @param               encoding => Information about encoding if needed.
     * @param               fileName => The name of the script that is beeing read.
     * @returns             The sql instructions stored in a string.
     */
    public static readScriptFile(path: string, fileName: string, encoding?: BufferEncoding,) : string {

        try {
            const content: string = fs.readFileSync(path, encoding);

            LoggerHelper.log(`The content of the SQL script ${this.accentuated(fileName)} has been read successfully.`, success);

            return content;
        }
        catch (err) {
            LoggerHelper.log(`An error occured... The SQL script ${this.accentuated(fileName)} is missing, please make sure to check that the path of this file is the right path in the configuration file.`, error);
        }
    }
}