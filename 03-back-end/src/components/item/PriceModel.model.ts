import IModel from '../../common/IModel.interface';

export default class PriceModel implements IModel {
    priceId: number;
    price: number;
    createdAt: string;
    
    itemId: number;
}