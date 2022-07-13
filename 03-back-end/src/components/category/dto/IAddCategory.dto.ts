import Ajv from "ajv";
import IServiceData from '../../../common/IServiceData.interface';

const ajv = new Ajv();

export default interface IAddCategory extends IServiceData {
    name:string;
    image_path:string;
    measurement: string;           

    /// ovde mozda bude trebalo dodati neke stvari
}
export interface IAddCategoryDto {
    name:string;
    imagePath:string;
    measurement: string;

}

const AddCategoryShema = {
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
        measurement: {
            type:"string",
        }
    },
    required: [
        "name",
        "imagePath"

    ],
    additionalProperties: false,
};

const AddCategoryValidator = ajv.compile(AddCategoryShema);

export { AddCategoryValidator};


