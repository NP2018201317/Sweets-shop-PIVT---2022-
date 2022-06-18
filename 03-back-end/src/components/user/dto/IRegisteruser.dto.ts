import Ajv from "ajv";
import IServiceData from '../../../common/IServiceData.interface';
import addFormats from "ajv-formats";

const ajv = new Ajv();
addFormats(ajv);

export interface IRegisterUserDto {
    email:string;
    password: string;
    forename: string;
    surname: string;
}

export interface IAddUser extends IServiceData {
    email:string;
    password_hash: string;
    forename: string;
    surname: string;
    activation_code: string;

}

const RegisterUserSchema = {
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
        "email",
        "password",
        "surname",
        "forename"

    ],
    additionalProperties: false,
};

const RegisterUserValidator = ajv.compile(RegisterUserSchema);

export { RegisterUserValidator};

