import { error_credential_check, error_environment, error_name, error_project_check } from "../constants/error-constant.js";
import { error, success } from "../constants/status-constant.js";
import { success_config_check, success_param } from "../constants/sucess-constant.js";
import { Environment } from "../enums/environment.js";
import { Configuration } from "../models/configuration.js";
import { Credential } from "../models/credential.js";
import { Project } from "../models/project.js";
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

    /**
     * @method
     * @description         Method that executes logging and verification of configuration file content.
     * @param               config => The configuration object that stores config.json data.
     */
    public static async checkConfiguration(config: Configuration) : Promise<void> {

        await this.checkConfigurationConstraint(config);

        LoggerHelper.log(success_config_check, success);
    }

    /**
     * @method
     * @description         Method that contains the checking logic for configuration file content.
     * @param               config => The configuration object that stores config.json data.
     */
    private static checkConfigurationConstraint(config: Configuration) : void {

        config.projects.forEach(project => {

            if (!this.checkProjectProperties(project)) LoggerHelper.log(error_project_check, error);

            project.credentials.forEach(credential => {

                if (!this.checkCredentialProperties(credential)) LoggerHelper.log(error_credential_check, error);
            })
        })
    }

    /**
     * @method
     * @description         Method that checks all the constraints concerning project part.
     * @param               project => One of the project stored in the configuration object.
     * @returns             Boolean that indicates if project's info are correct or not.
     */
    private static checkProjectProperties(project: Project): boolean {

        let isValid: boolean = true;

        const properties: string[] = [project.name, project.instance_name, project.database_name];

        properties.forEach(property => {

            if (!property || property == "") isValid = false;
        })

        if (project.paths.length == 0) isValid = false;

        return isValid;
    }

    /**
     * @method
     * @description         Method that checks all the constraints concerning credential part.
     * @param               credential => One of the credential stored in a given project.
     * @returns             Boolean that indicates if credential's info are correct or not.
     */
    private static checkCredentialProperties(credential: Credential) : boolean {

        let isValid: boolean = true;

        const properties: string[] = [credential.environment, credential.username, credential.password];

        properties.forEach(property => {

            if (!property || property == "") isValid = false;
        })

        return isValid;
    }
}