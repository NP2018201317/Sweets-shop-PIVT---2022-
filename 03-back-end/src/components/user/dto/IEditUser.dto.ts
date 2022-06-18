import Ajv from "ajv";
import IServiceData from '../../../common/IServiceData.interface';
import addFormats from "ajv-formats";

const ajv = new Ajv();
addFormats(ajv);

export default interface IEditUser extends IServiceData {
    password_hash?: string;
    is_active?: number;
    forename?: string;
    surname?: string;
    activation_code?: string;
}

export interface IEditUserDto {
    password?: string;
    isActive?: boolean;
    forename?: string;
    surname?: string;
}

const EditUserShema = {
    type: "object",
    properties: {
        email: {
            type:"string",
            format: "email"
        },
        password: {
            type:"string",
            pattern: "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,}$",
        },
        forename: {
            type:"string",
            minLength: 2,
            maxLength: 64
        },
        surname: {
            type:"string",
            minLength: 2,
            maxLength: 64
        }
    },
    required: [
        

    ],
    additionalProperties: false,
};

const EditUserValidator = ajv.compile(EditUserShema);

export { EditUserValidator};