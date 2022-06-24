import Ajv from "ajv";
import IServiceData from '../../../common/IServiceData.interface';

const ajv = new Ajv();

export interface IUserLoginDto{

    email: string;
    password: string;

    
}


const UserLoginValidatorSchema = {
    type: "object",
    properties: {
        email: {
            type:"string",
            pattern: "email",
        },
        password: {
            type:"string",
            pattern: "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,}$",
        }
    },
    required: [
        "email",
        "password"

    ],
    additionalProperties: false,
};

const UserLoginValidator = ajv.compile(UserLoginValidatorSchema);

export { UserLoginValidator};