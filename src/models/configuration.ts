import { IProject, Project } from "./project.js";

/**
 * @interface
 * @description     Interface that represents the structure of a configuration object.
 */
export interface IConfiguration {

    projects: IProject[];
}


/**
 * @class
 * @classdesc       Class that contains all the information of a configuration object.
 */
export class Configuration {

    public projects: Project[];

    /**
     * @constructor
     * @param           data => Data read or retrieved from an external source.
     */
    constructor(data: IConfiguration) {

        this.projects = data.projects && data.projects.length >= 1 ? data.projects.map(project => new Project(project)) : [];
    }
}