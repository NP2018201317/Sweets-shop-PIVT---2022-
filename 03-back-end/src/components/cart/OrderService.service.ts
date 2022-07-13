import BaseService from '../../common/BaseService';
import IAdapterOptions from '../../common/IAdapterOptions.interface';
import OrderModel from './OrderModel.model';
import { resolve } from 'path';
import { IAddOrder } from './dto/IMakeOrder.dto';

export interface IOrderAdapterOptions extends IAdapterOptions {
    loadCartData: boolean;
}

export const DefaultOrderAdapterOptions: IOrderAdapterOptions = {
    loadCartData: true,
}

export default class OrderService extends BaseService<OrderModel, IOrderAdapterOptions> {
    tableName(): string {
        return "order";
    }
    sortFildName(): string {
        return "order_id"
    }
    protected adaptToModel(data: any, options: IOrderAdapterOptions = DefaultOrderAdapterOptions): Promise<OrderModel> {
        return new Promise(async resolve => {
            const order = new OrderModel();

            order.orderId = +data?.order_id;
            order.cartId = +data?.cart_id;
            order.createdAt = new Date(data?.created_at);
            order.note = data?.note;
            order.status = data?.status;

            if (options.loadCartData) {
                order.cart = await this.services.cart.getById(order.cartId, {} );
            }

            resolve(order);
        });
    }

    public async getByCartId(cartId: number, options: IOrderAdapterOptions = {loadCartData: false}): Promise<OrderModel|null> {
        return new Promise((resolve, reject) => {
            this.getAllByFieldNameAndValue("cart_id", cartId, options).then(result => {
                if (result.length === 0) {
                    return resolve(null);
                }
                resolve(result[0]);
            })
            .catch(error => {
                reject(error);
            })


    })

}
    public async makeOrder(data: IAddOrder): Promise<OrderModel> {
        return new Promise((resolve, reject) => {
            this.baseAdd(data, {
                loadCartData: true
            })
            .then(result => {
                resolve(result);
            })
            .catch(error => {
                reject(error);
            })
        })
    }

    public async getAllByUserId(userId: number): Promise<OrderModel[]> {

        return new Promise(resolve => {
            this.services.cart.gettAllByUserId(userId).then(async carts =>{
                
                const orders = [];

                for(let cart of carts){
                    orders.push(await this.getByCartId(cart.cartId, {loadCartData: true}));
                }

                resolve(orders);
            })
        })
    }
}