import Ajv from "ajv";
import IServiceData from '../../../common/IServiceData.interface';


const ajv = new Ajv();

export default interface IAddItem extends IServiceData {
    name:string;
    description: string;
    category_id: number;        
    image_path: string;

    /// ovde mozda bude trebalo dodati neke stvari
}
export interface IAddItemDto {
    name:string;
    description:string;
    imagePath:string;
    ingredientIds: number[]; // trebamo dodati i cenu
   

}

export interface IItemIgredient extends IServiceData {
    item_id: number;
    ingredient_id: number;
}


const AddItemShema = {
    type: "object",
    properties: {
        name: {
            type:"string",
            minLength:4,
            maxLength:128,
        },
        description: {
            type: "string",
            minLength: 32,
            maxLength: 500,
        },
        image_path: {
            type: "string",
            minLength: 4,
            maxLength: 255
        },
        ingredientIds: {
            type: "array",
            minItems: 0,
            uniqueItems: true,
            additionalItems: false,
            items: [
                {type: "integer"}
            ]
        }

    },
    required: [
        "name",
        "description",
        "imagePath",
        "ingredientIds"
       

    ],
    additionalProperties: false,
};

const AddItemValidator = ajv.compile(AddItemShema);

export { AddItemValidator};
