import Ajv from "ajv";
import IServiceData from '../../../common/IServiceData.interface';

const ajv = new Ajv();

export interface IAdministratorLoginDto{

    username: string;
    password: string;

    
}


const AdministratorLoginValidatorSchema = {
    type: "object",
    properties: {
        username: {
            type:"string",
            pattern: "^[a-z\-]{5,64}$",
        },
        password: {
            type:"string",
            pattern: "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,}$",
        }
    },
    required: [
        "username",
        "password"

    ],
    additionalProperties: false,
};

const AdministratorLoginValidator = ajv.compile(AdministratorLoginValidatorSchema);

export { AdministratorLoginValidator};