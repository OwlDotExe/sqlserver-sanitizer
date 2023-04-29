import chalk, { Chalk } from "chalk"
import moment from "moment"

import { error, success } from "../constants/status-constant.js";
import { error_status } from "../constants/error-constant.js";

/**
 * @class
 * @classdesc   Static helper used for logging purposes.
 */
export class LoggerHelper {

    /**
     * @field   Color of a success message.
     */
    private static success_color: Chalk = chalk.hex('#55efc4');

    /**
     * @field   Color of an error message.
     */
    private static error_color: Chalk = chalk.hex('#ff7675');

    /**
     * @field   Color of time part of the message.
     */
    private static locality_color: Chalk = chalk.hex('#ffeaa7');

    /**
     * @field   Color of the prefix part of the message.
     */
    private static prefix_color: Chalk = chalk.hex('#636e72');

    /**
     * @method
     * @description     Method that is the entry point for logging request.
     * @param           message => System message logged.
     * @param           status => Status code of the message logged.
     */
    public static log(message: string, status: string) : void {

        switch(status) {
            case success:
                this.write(message, this.success_color, status);
                break;
            case error:
                this.write(message, this.error_color, status);
                process.exit();
            default:
                this.write(error_status, this.error_color, error);
                break;
        }
    }

    /**
     * @method
     * @description             Method that writes a message logged during the execution of the script.
     * @param                   message => System message logged.
     * @param                   chalk_instance => Corresponding color to the type of message.
     * @param                   status => Status that represents the type of message.
     */
    private static write(message: string, chalk_instance: Chalk, status: string) : void {

        console.log(`${this.prefix_color('[System information]')} - ${this.locality_color(moment().format('DD/MM/YYYY HH:mm:SS'))} - ${chalk_instance(status)}`);
        console.log(`${this.prefix_color('[System message]')} - ${message}\n`);
    }
}