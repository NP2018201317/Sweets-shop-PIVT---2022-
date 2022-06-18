import BaseService from '../../common/BaseService';
import UserModel from './UserModel.model';
import IAdapterOptions from '../../common/IAdapterOptions.interface';
import {IAddUser, IRegisterUserDto} from './dto/IRegisterUser.dto';
import { DefaultCategoryAdapterOptions } from '../category/CategoryServices.service';
import IEditUser from './dto/IEditUser.dto';
//import IEditUser from './dto/IEditUser.dto';

export class UserAdapteroptions implements IAdapterOptions {

    removePassword: boolean;
    removeActivationCode: boolean;

}

export const DefaultUserAdapterOptions: UserAdapteroptions = {
    removePassword: false,
    removeActivationCode: false,
}


export default class UserService extends BaseService<UserModel, UserAdapteroptions> {
    tableName(): string {
        return "user";
    }

    protected async adaptToModel(data: any, options: UserAdapteroptions = DefaultUserAdapterOptions): Promise<UserModel | null> {
        const user= new UserModel();

        user.userId = +data?.user_id; 
        user.email = data?.email;
        user.passwordHash = data?.password_hash;
        user.isActive = +data?.is_active == 1;
        user.forename = data?.forename;
        user.surname = data?.surname;
        user.activationCode = data?.activation_code ? data?.activation_code : null;
        user.phoneNumber = data?.phone_number;
        user.adress = data?.adress;

        if (options.removePassword) {
            user.passwordHash = null;
        }

        if (options.removeActivationCode) {
            user.activationCode = null;
        }

        return user;

    }

    public async add(data: IAddUser): Promise<UserModel> {
        return this.baseAdd(data, {
            removeActivationCode: true,
            removePassword: true,
        });
    }

    public async edit(id: number, data: IEditUser): Promise<UserModel> {
        return this.baseEditById(id, data, {
            removePassword: true,
            removeActivationCode: true,
        })
    }

    public async getUserByActivationCode(code: string, options: UserAdapteroptions = DefaultUserAdapterOptions): Promise<UserModel|null> {
        return new Promise((resolve, reject) => {
            this.getAllByFieldNameAndValue("activation_code", code, options).then(result => {
                if(result.length === 0) {
                    return resolve(null);
                }

                resolve(result[0]);
            })
            .catch(error => {
                reject(error?.message);
            })
        })
    }

}