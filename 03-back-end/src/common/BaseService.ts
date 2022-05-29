import * as mysql2 from 'mysql2/promise';
import IModel from './IModel.interface';
import IAdapterOptions from './IAdapterOptions.interface';
import { openSync } from 'fs';

export default abstract class BaseService <ReturnModel extends IModel, AdapterOptions extends IAdapterOptions> {
    private db: mysql2.Connection;

    constructor(databaseConnection: mysql2.Connection){
        this.db = databaseConnection;
    }

    protected get databaseConnection(): mysql2.Connection{
        return this.db;
    }

    abstract tableName(): string;

    protected abstract adaptToModel(data: any, options: AdapterOptions): Promise<ReturnModel>;

    public getAll(options: AdapterOptions): Promise<ReturnModel[]> {
        const tableName = this.tableName();
        return new Promise<ReturnModel[]>(
            (resolve,reject) => {
                const sql: string = `SELECT * FROM \`${ tableName }\` WHERE is_active=1;`;
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
            const sql: string = `SELECT * FROM \`${tableName}\` WHERE is_active=1 AND ${tableName}_id = ?;`;
            this.databaseConnection.execute(sql, [id]).then(async([rows]) => {
                
                if(rows == undefined){
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

    protected async getAllByFieldNameAnValue(fieldName: string, value: any, options: AdapterOptions): Promise<ReturnModel[]> {
        const tableName = this.tableName();
        return new Promise<ReturnModel[]>(

        (resolve,reject) => {
            const sql: string = `SELECT * FROM \`${tableName}\` WHERE is_active=1 AND \`${fieldName}\` = ?;`;
            this.databaseConnection.execute(sql, [value]).then(async([rows]) => {
                    
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
        })
    }
    

}