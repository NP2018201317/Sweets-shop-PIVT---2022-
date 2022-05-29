import Ajv from "ajv";

const ajv = new Ajv();

export default interface IAddCategory {
    name:string;
    imagePath:string;

    /// ovde mozda bude trebalo dodati neke stvari
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
    },
    required: [
        "name",
        "imagePath"

    ],
    additionalProperties: false,
};

const AddCategoryValidator = ajv.compile(AddCategoryShema);

export { AddCategoryValidator};


