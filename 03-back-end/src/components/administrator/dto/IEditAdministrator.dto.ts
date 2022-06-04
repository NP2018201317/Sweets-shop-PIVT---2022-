import Ajv from "ajv";
import IServiceData from '../../../common/IServiceData.interface';

const ajv = new Ajv();

export default interface IEditAdministrator extends IServiceData {
    password_hash: string;
}

export interface IEditAdministratorDto {
    password: string;
}

const EditAdministratorShema = {
    type: "object",
    properties: {

        password: {
            type:"string",
            pattern: "^(?=.[0-9])(?=.[a-z])(?=.*[A-Z]).{6,}$",
        }
    },
    required: [
            "password",

    ],
    additionalProperties: false,
};

const EditAdministratorValidator = ajv.compile(EditAdministratorShema);

export { EditAdministratorValidator};