import IModel from '../../common/IModel.interface';
import ItemModel from '../item/ItemModel.model';

export interface ICartItem {
    amount:number;
    item: ItemModel;
}


export default class CartModel implements IModel {
    cartId: number;
    userId: number;
    createdAt: Date;

    items: ICartItem[];

    isUsed: boolean;
}

