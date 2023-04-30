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
export const error_project_empty: string = "An error occured... No projects will be treated, please make sure that projects passed are matching with the projects stored in the configuration file.";
export const error_name: string = "An error occured... One of the name passed as parameters does not match any project of the configuration file.";

export const error_project_check: string = "An error occured... One of the project is missing some properties, please make sure that you fill all the properties needed for each project in the configuration file.";
export const error_credential_empty: string = "An error occured... One of the project does not have any credentials, please make sure to have at least one credential object associated with your project.";
export const error_credential_check: string = "An error occured... One of the credentials is missing some properties, please make sure that you fill all the properties needed for each credential in the configuration file.";

export const error_credential_match: string = "An error occured... One of the project is missing a credential that corresponds to the environment passed with the command line.";

export const error_database_retrieval: string = "An error occured... The retrieval of the database encountered a problem.";