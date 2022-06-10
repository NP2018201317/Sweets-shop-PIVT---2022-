import Ajv from "ajv";
import IServiceData from '../../../common/IServiceData.interface';

const ajv = new Ajv();

export default interface IEditIngredient extends IServiceData {
    name:string;          

    /// ovde mozda bude trebalo dodati neke stvari
}
export interface IEditIngredientDto {
    name:string;
   

}

const EditIngredientShema = {
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

const EditIngredientValidator = ajv.compile(EditIngredientShema);

export { EditIngredientValidator};