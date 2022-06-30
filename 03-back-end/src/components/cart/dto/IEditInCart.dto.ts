import Ajv from "ajv";

const ajv = new Ajv();

export interface IEditInCartDto {
    itemId: number;
    amount: number;

}

const EditInCartSchema = {
    type: "object",
    properties: {
        itemId: {
            type:"integer",
        },
        amount: {
            type: "integer",
            minimum: 0,
        },
        
    },
    required: [
     "itemId",
     "amount",
        
       

    ],
    additionalProperties: false,
};

const EditInCartValidator = ajv.compile(EditInCartSchema);

export { EditInCartValidator};