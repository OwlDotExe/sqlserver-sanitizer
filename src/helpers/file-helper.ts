import * as fs from 'fs';

import { LoggerHelper } from './logger-helper.js';
import { error, success } from '../constants/status-constant.js';
import { error_config_empty, error_config_read } from '../constants/error-constant.js';
import { Configuration, IConfiguration } from '../models/configuration.js';
import { sucess_config_read } from '../constants/sucess-constant.js';

/**
 * @class
 * @classdesc   Static helper used for file management purposes.
 */
export class FileHelper {

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
}