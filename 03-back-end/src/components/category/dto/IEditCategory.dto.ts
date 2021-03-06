import Ajv from "ajv";
import IServiceData from '../../../common/IServiceData.interface';

const ajv = new Ajv();

export default interface IEditCategory extends IServiceData {
    name?:string;
    image_path?:string; 
    is_active?:number          /// treba videti sta raditi sa image pathom jer zbog dodavanja add metoda u base servicu postman vidi kao da je upit u imagePath
                                                                                                                            ///umesto image_path i nece da insertuje

    /// ovde mozda bude trebalo dodati neke stvari
}

interface IEditCategoryDto {
    name?:string;
    imagePath?:string;
    isActive?: boolean

}


const EditCategoryShema = {
    type: "object",
    properties: {
        name: {
            type:"string",
            minLength:4,
            maxLength:128,
        },

        imagePath: {
            type:"string",
            minLength:4,
            maxLength:50,
        },
        isActive:{
            type: "boolean"
        }
    },
    required: [


    ],
    additionalProperties: false,
};

const EditCategoryValidator = ajv.compile(EditCategoryShema);

export { EditCategoryValidator, IEditCategoryDto};


