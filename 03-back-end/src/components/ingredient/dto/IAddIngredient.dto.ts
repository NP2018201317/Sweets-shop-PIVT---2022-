import Ajv from "ajv";
import IServiceData from '../../../common/IServiceData.interface';

const ajv = new Ajv();

export default interface IAddIngredient extends IServiceData {
    name:string;          

    /// ovde mozda bude trebalo dodati neke stvari
}
export interface IAddIngredientDto {
    name:string;
   

}

const AddIngredientShema = {
    type: "object",
    properties: {
        name: {
            type:"string",
            minLength:4,
            maxLength:128,
        },

    },
    required: [
        "name",
       

    ],
    additionalProperties: false,
};

const AddIngredientValidator = ajv.compile(AddIngredientShema);

export { AddIngredientValidator};


