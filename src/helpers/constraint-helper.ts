import { error_environment, error_name } from "../constants/error-constant.js";
import { error, success } from "../constants/status-constant.js";
import { success_param } from "../constants/sucess-constant.js";
import { Environment } from "../enums/environment.js";
import { Configuration } from "../models/configuration.js";
import { LoggerHelper } from "./logger-helper.js";

/**
 * @class
 * @classdesc   Static class used for constraint checking purposes.
 */
export class ConstraintHelper {

    /**
     * @method
     * @description             Method that checks all the constraints concerning parameters of the command.
     * @param                   environment => The environment passed with the command line call.
     * @param                   names => The list of project that has to be treated.
     * @param                   config => The configuration object that stores config.json data.
     */
    public static checkParameters(environment: string, names: string[], config: Configuration) : void {

        const keys_values: string[] = Object.keys(Environment);
        const keys: string[] = keys_values.slice(keys_values.length / 2).map(key => { return key.toLocaleLowerCase(); });

        var index: number = keys.findIndex(key => key == environment);

        if (index == -1) LoggerHelper.log(error_environment, error);

        names.forEach(name => {

            index = config.projects.findIndex(project => project.name == name);

            if (index == -1) LoggerHelper.log(error_name, error);
        })

        LoggerHelper.log(success_param, success);
    }
}