import Ajv from "ajv";

const ajv = new Ajv();

export interface IAddToCartDto {
    itemId: number;
    amount: number;

}

const AddToCartSchema = {
    type: "object",
    properties: {
        itemId: {
            type:"integer",
        },
        amount: {
            type: "integer",
            minimum: 1,
        },
        
    },
    required: [
     "itemId",
     "amount",
        
       

    ],
    additionalProperties: false,
};

const AddToCartValidator = ajv.compile(AddToCartSchema);

export { AddToCartValidator};