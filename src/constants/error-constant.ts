// ************************************************************************************************ //
//                                                                                                  //
//      File that contains all the available error message during the execution of the script.      //
//                                                                                                  //
// ************************************************************************************************ //


export const error_empty_param: string = "An error occured... No parameters has been passed with the command, please make sure to pass all the parameters needed.";

export const error_status: string = "An error occured... Status is not recognized when executing log action.";

export const error_config_read: string = "An error occured... Configuration file is missing, please make sure that you add this file at the root of the project.";
export const error_config_empty: string = "An error occured... Configuration does not have any projects in it, plase make sure to have projects before running commands again.";

export const error_environment: string = "An error occured... Environment passed as an argument is not valid, please make sure that your environment is in the given list : local, beta.";
export const error_name: string = "An error occured... One of the name passed as parameters does not match any project of the configuration file.";