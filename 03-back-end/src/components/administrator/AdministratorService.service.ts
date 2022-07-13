import BaseService from '../../common/BaseService';
import AdministratorModel from './AdministratorModel.model';
import IAdapterOptions from '../../common/IAdapterOptions.interface';
import IAddAdministrator from './dto/IAddAdministrator.dto';
import { DefaultCategoryAdapterOptions } from '../category/CategoryServices.service';
import IEditAdministrator from './dto/IEditAdministrator.dto';
import IAdministrator from '../../../../04-front-end/src/models/IAdministrator.model';
import * as mysql2 from 'mysql2/promise';

export class AdministratorAdapteroptions implements IAdapterOptions {

    removePassword: boolean;

}

export const DefaultAdministratorAdapterOptions: AdministratorAdapteroptions = {
    removePassword: false,
}


export default class AdministratorService extends BaseService<AdministratorModel, AdministratorAdapteroptions> {
    tableName(): string {
        return "administrator";
    }
    sortFildName(): string {
        return "administrator_id";
    }

    protected async adaptToModel(data: any, options: AdministratorAdapteroptions = DefaultAdministratorAdapterOptions): Promise<AdministratorModel> {
        const administrator= new AdministratorModel();

        administrator.administratorId = +data?.administrator_id; 
        administrator.username = data?.username;
        administrator.passwordHash = data?.password_hash;
        administrator.createdAt = data?.created_at;
        administrator.isActive = +data?.is_active == 1;

        if (options.removePassword) {
            administrator.passwordHash = null;
        }

        return administrator;

    }

    public async add(data: IAddAdministrator): Promise<AdministratorModel> {
        return this.baseAdd(data, DefaultAdministratorAdapterOptions);
    }

    public async edit(id: number, data: IEditAdministrator): Promise<AdministratorModel> {
        return this.baseEditById(id, data, {
            removePassword: true,
        })
    }

    public async getByUsername(username: string): Promise<AdministratorModel|null>{
        return new Promise((resolve, reject) => {
        this.getAllByFieldNameAndValue("username", username, {
        removePassword: false,
        })
        .then(result => {
            if (result.length === 0) {
                return resolve(null);
            }

            resolve(result[0]);
        })
        .catch(error => {
            reject(error);

        })
    })
}

public async getAllAdministratorsForAdmin(): Promise<AdministratorModel[]> {
    return new Promise((resolve, reject) => {
      
        const sql: string = "SELECT * FROM administrator";

    this.databaseConnection.execute(sql).then(async ([rows]) => {

        const items: AdministratorModel[] = [];
                
                for (const row of rows as mysql2.RowDataPacket[]) {
                    items.push(await this.adaptToModel(row));

                }
                resolve(items);

    })
    .catch(error => {
        reject(error);
    });
   
    
    })

}
}



   