import sql, { ConnectionPool, IResult, config } from "mssql";

/**
 * @class
 * @classdesc   Static class used for database executions purposes.
 */
export class DatabaseHelper {

    /**
     * @field   Instance of the class itself.
     */
    private static instance: DatabaseHelper;

    /**
     * @field   Configuration used for database actions.
     */
    private static configuration: config;

    /**
     * @field   
     */
    private pool: ConnectionPool;

    /**
     * @constructor
     * @param           config => Configuration object that contains environment information.
     */
    private constructor(config: config) {
        
        this.pool = new sql.ConnectionPool(config);
    }

    /**
     * @method
     * @description             Method that returns the instance
     * @param                   config => Configuration object that contains environment information.
     * @param                   isNewInstance => Boolean used to force the initialization.
     * @returns                 Instance of the class.
     */
    public static getInstance(config: config, isNewInstance?: boolean) : DatabaseHelper {

        this.configuration = config;

        if (!this.instance || isNewInstance) {

            this.instance = new DatabaseHelper(config);
        }

        return this.instance;
    }

    /**
     * @method
     * @description         Method that opens a new connection to SQL Server.
     */
    public async connect(): Promise<void> {

        await this.pool.connect();
    }

    /**
     * @method
     * @description         Method that executes a query.
     * @param               query => The query to execute.
     * @returns             The result of the query.
     */
    public async executeQuery(query: string): Promise<IResult<any>> {

        return await this.pool.request().query(query);
    }

    /**
     * @method
     * @description         Method that closes an existing connection to SQL Server.
     */
    public async close(): Promise<void> {

        await this.pool.close();
    }
}