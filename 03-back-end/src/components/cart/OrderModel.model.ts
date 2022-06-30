import IModel from '../../common/IModel.interface';
import CartModel from './CartModel.model';

export default class OrderModel implements IModel {

    orderId: number;
    note: string;
    status: 'pending' | 'declined' | 'acepted';
    createdAt: Date;
    cartId: number;
    cart: CartModel;
}