import Ajv from "ajv";
import IServiceData from '../../../common/IServiceData.interface';


const ajv = new Ajv();

export default interface IAddItem extends IServiceData {
    name:string;
    description: string;
    category_id: number;        
    image_path: string;
    price:number;

    /// ovde mozda bude trebalo dodati neke stvari
}
export interface IAddItemDto {
    name:string;
    description:string;
    imagePath:string;
    ingredientIds: number[]; // trebamo dodati i cenu
    price:number;

   

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
            items: 
                {type: "integer"}
            
        },
        price: {
            type: "number",
            multipleOf: 0.01,
        }

    },
    required: [
        "name",
        "description",
        "imagePath",
        "ingredientIds",
        "price"
       

    ],
    additionalProperties: false,
    
};

const AddItemValidator = ajv.compile(AddItemShema);

export { AddItemValidator};
