import Ajv from "ajv";
import IServiceData from '../../../common/IServiceData.interface';


const ajv = new Ajv();

export default interface IEditItem extends IServiceData {
    name:string;
    description: string;
    is_active:number;        
    image_path: string;
    price:number;

    /// ovde mozda bude trebalo dodati neke stvari
}
export interface IEditItemDto {
    name:string;
    description:string;
    imagePath:string;
    isActive:boolean;
    ingredientIds: number[]; // trebamo dodati i cenu
    price: number;
   

}

export interface IItemIgredient extends IServiceData {
    item_id: number;
    ingredient_id: number;
}


const EditItemShema = {
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
        imagePath: {
            type: "string",
            minLength: 4,
            maxLength: 255
        },
        isActive: {
            type:"boolean",
        },
        ingredientIds: {
            type: "array",
            minItems: 0,
            uniqueItems: true,
            items: 
                {type: "integer"}
            
        },
        price: {
            type:"number",
            multipleOf: 0.01
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

const EditItemValidator = ajv.compile(EditItemShema);

export { EditItemValidator};
