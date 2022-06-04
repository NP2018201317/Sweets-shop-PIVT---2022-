import BaseService from '../../common/BaseService';
import AdministratorModel from './AdministratorModel.model';
import IAdapterOptions from '../../common/IAdapterOptions.interface';
import IAddAdministrator from './dto/IAddAdministrator.dto';
import { DefaultCategoryAdapterOptions } from '../category/CategoryServices.service';
import IEditAdministrator from './dto/IEditAdministrator.dto';

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

}

   