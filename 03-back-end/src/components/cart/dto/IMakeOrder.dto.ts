import Ajv from "ajv";
import IServiceData from '../../../common/IServiceData.interface';

const ajv = new Ajv();

export interface IMakeOrderDto {
    cartId: number;

}

export interface IAddOrder extends IServiceData {
    cart_id: number;
}

const MakeOrderSchema = {
    type: "object",
    properties: {
        cartId: {
            type:"integer",
        }
        
    },
    required: [
     
     
    ],
    additionalProperties: false,
};

const MakeOrderValidator = ajv.compile(MakeOrderSchema);

export { MakeOrderValidator};