import * as mysql2 from 'mysql2/promise';
import IModel from './IModel.interface';
import IAdapterOptions from './IAdapterOptions.interface';
import IServiceData from './IServiceData.interface';
import { IServices } from './IApplicationResources.interface';
import IApplicationResources from './IApplicationResources.interface';

export default abstract class BaseService <ReturnModel extends IModel, AdapterOptions extends IAdapterOptions> {
    private db: mysql2.Connection;
    private serviceInstances: IServices;

    constructor(resources: IApplicationResources){
        this.db = resources.databaseConnection;
        this.serviceInstances = resources.services;
    }

    protected get databaseConnection(): mysql2.Connection{
        return this.db;
    }

    protected get services(): IServices {
        return this.serviceInstances;
    }

    public startTransaction() {
        return this.db.beginTransaction();
    }

    public comitChanges() {
        return this.db.commit();
    }

    public rollbackChanges() {
        return this.db.rollback();
    }

    abstract tableName(): string;

    protected abstract adaptToModel(data: any, options: AdapterOptions): Promise<ReturnModel>;

    public getAll(options: AdapterOptions): Promise<ReturnModel[]> {
        const tableName = this.tableName();
        return new Promise<ReturnModel[]>(
            (resolve,reject) => {
                const sql: string = `SELECT * FROM \`${ tableName }\`;`;
                this.databaseConnection.execute(sql).then(async([rows]) => {
                    
                    if(rows == undefined){
                        resolve([]);
                    }

                    const items: ReturnModel[] = [];
                    
                    for (const row of rows as mysql2.RowDataPacket[]) {
                        items.push(await this.adaptToModel(row, options));

                    }
                    resolve(items);

                }).catch(error =>{

                    reject(error);
                    
                });
            }
        )
        
    };

        public getById(id:number, options: AdapterOptions): Promise<ReturnModel|null> {
        const tableName = this.tableName();
            
        return new Promise<ReturnModel>(

        (resolve,reject) => {
            const sql: string = `SELECT * FROM \`${tableName}\` WHERE ${tableName}_id = ?;`;
            this.databaseConnection.execute(sql, [id]).then(async([rows]) => {
                
                if(rows === undefined){
                    resolve(null);
                }

                if (Array.isArray(rows) && rows.length === 0) {
                    return resolve(null);
                }

                resolve(await this.adaptToModel(rows[0],options));

            }).catch(error =>{

                reject(error);
                
            });
        })
    }

    protected async getAllByFieldNameAndValue(fieldName: string, value: any, options: AdapterOptions): Promise<ReturnModel[]> {
        const tableName = this.tableName();
        return new Promise<ReturnModel[]>(

        (resolve,reject) => {
            const sql: string = `SELECT * FROM \`${tableName}\` WHERE \`${fieldName}\` = ?;`;
            this.databaseConnection.execute(sql, [value]).then(async([rows]) => {
                    
                if(rows === undefined){
                    resolve([]);
                }

                const items: ReturnModel[] = [];
                
                for (const row of rows as mysql2.RowDataPacket[]) {
                    items.push(await this.adaptToModel(row, options));

                }
                resolve(items);

            }).catch(error =>{

                reject(error);
                
            });
        })
    }

    protected async getAllFromTableByFieldNameAndValue<OwnReturnType>( tableName: string, fieldName: string, value: any): Promise<OwnReturnType[]>{
        return new Promise((resolve, reject) =>{
            const sql = `SELECT * FROM \`${tableName}\` WHERE \`${fieldName}\` = ?;`;
            this.databaseConnection.execute(sql, [value]).then(async([rows]) => {
                    
                if(rows === undefined){
                    resolve([]);
                }

                const items: OwnReturnType[] = [];
                
                for (const row of rows as mysql2.RowDataPacket[]) {
                    items.push(row as OwnReturnType);

                }
                resolve(items);

            }).catch(error =>{

                reject(error);
                
            });
        })
        
    }
    
    protected async baseAdd(data: IServiceData, options:AdapterOptions): Promise<ReturnModel>{
            const tableName = this.tableName();
        
            return new Promise((resolve, reject) => {
                const properties = Object.getOwnPropertyNames(data);
                const sqlPairs = properties.map(property => "`" + property + "`= ?").join(", ");
                const values = properties.map(property => data[property]);

                const sql: string = "INSERT`" + tableName + "`SET " + sqlPairs + ";";             ////trebadodati measurment enum
    
                this.databaseConnection.execute(sql, values).then(async result => {
                    const info: any = result;
    
                    const newItemId = +info[0]?.insertId;
    
                    const newItem: ReturnModel|null = await this.getById(newItemId, options);
    
                    if (newItem == null) {
                        return reject ({message: 'Could not add a new item into the' + tableName + 'table!',});
                    }
    
                    resolve(newItem);
    
                })
                .catch(error => {
                    reject(error);
                });
            });
        
    }

    protected async baseEditById(id: number, data: IServiceData, options:AdapterOptions): Promise<ReturnModel> {
        const tableName = this.tableName();

        return new Promise((resolve, reject) => {
            
            const properties = Object.getOwnPropertyNames(data);

            if (properties.length === 0) {
                return reject ({ message: "There is nothing to change!"}) 
            }

            const sqlPairs = properties.map(property => "`" + property + "`= ?").join(", ");
            const values = properties.map(property => data[property]);
            values.push(id); //WHERE tablename_id =?

            const sql: string = "UPDATE " + tableName + " SET" + sqlPairs + " WHERE " + tableName + "_id = ?;";
            
            this.databaseConnection.execute(sql, values).then(async result => {
                const info: any = result;

                if (info[0]?.affectedRows === 0) {

                    return reject ({ message: "Could not change any items in the" + tableName + "table!",});
                }

                const item: ReturnModel|null = await this.getById(id, options);

                if (item === null) {
                    return reject ({message: 'Could not find this item in the' + tableName + 'table!',});
                }

                resolve(item);

            })
            .catch(error => {
                reject(error);
            });

        });
        
    }
    public async baseDeleteById(id: number): Promise<true> {
        const tableName = this.tableName();
        
        return new Promise((resolve, reject) => {
            const sql: string = "DELETE FROM`" + tableName + "` WHERE `" + tableName + "_id` = ?;";

            this.databaseConnection.execute(sql, [id]).then(async result => {
                const info: any = result;

                if (info[0]?.affectedRows === 0) {

                    return reject ({ message: "Could not delete any items in the" + tableName + "table!",});
                }

                resolve(true);

            })
            .catch(error => {
                reject(error);
            });
        })
    }

}