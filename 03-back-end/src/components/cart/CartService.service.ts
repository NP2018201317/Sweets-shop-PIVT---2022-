import BaseService from '../../common/BaseService';
import CartModel from './CartModel.model';
import IAdapterOptions from '../../common/IAdapterOptions.interface';
import { ICartItem } from './CartModel.model';

export interface ICartAdapterOptions extends IAdapterOptions{

} 

export default class CartService extends BaseService<CartModel, ICartAdapterOptions> {
    tableName(): string {
        return "cart";
    }

    protected adaptToModel(data: any, options: ICartAdapterOptions = {}): Promise<CartModel> {
        return new Promise(async resolve => {
            const cart = new CartModel();
            
            cart.cartId = +data?.cart_id;
            cart.userId = +data?.user_id;
            cart.createdAt = new Date(data?.created_at);

            cart.isUsed = false;
            

            if (await this.services.order.getByCartId(cart.cartId)) {
                cart.isUsed = true;
            }

            cart.items = [];


            this.getAllFromTableByFieldNameAndValue("cart_item", "cart_id", cart.cartId).then(async result => {
                cart.items = await Promise.all(result.map(this.fillOutCartItemData));

                return cart;
            })
            .then(cart => {
                resolve(cart);
            })
            resolve(cart);

        });
    }

     private async fillOutCartItemData(data: {item_id: number, amount: number}): Promise<ICartItem>{
         return new Promise(resolve =>{
             this.getAllFromTableByFieldNameAndValue<{ item_id: number }>("item", "item_id", data.item_id)
           .then(items =>{
               if(items.length === 0){
                   throw {
                       status: 404,
                       message: "Item not found!"
                   }
               }
               return items[0];

             })
             .then(item => {
                 return this.services.item.getById(item.item_id, { loadIngredient: false, loadCategory: false, hideInactiveCategories: false })
             })
            
        })
     }

    async getUserCart(id: number): Promise<CartModel> {
        return new Promise((resolve, reject) => {
            this.gettAllByUserId(id).then(carts => {
                if (carts.length === 0) {
                    return this.createNewCart(id);
                };
            
            

            const lastCart = carts[carts.length -1];

            if (lastCart.isUsed) {
                return this.createNewCart(id);
                
            }

            return lastCart;

        })
            .then(cart => {
                resolve (cart);
            })
            .catch(error => {
                reject(error);
            })
        });
    }

    async gettAllByUserId(userId: number, options: ICartAdapterOptions = {}): Promise<CartModel[]> {
        return this.getAllByFieldNameAndValue("user_id", userId, options);
    }

    private async createNewCart(userId: number): Promise<CartModel> {
        return this.baseAdd(
            { user_id: userId },
            { }
        );
    }

    public async editCartItemAmount(cartId: number, itemId: number, amount: number): Promise<CartModel> {
        return new Promise((resolve, reject) => {   
            const sql = `UPDATE
                        cart_item
                    SET
                        cart_item.amount = ?
                    WHERE
                        cart_item.cart_id = ?
                    AND cart_item.item_id = ?`;
        this.databaseConnection.execute(sql, [amount, cartId, itemId]).then(result => {
            resolve(this.getById(cartId, {}));
        })
        .catch(error => {
            reject(error);
        })         
    })
}
    public async addCartItem(cartId: number, itemId: number, amount: number): Promise<CartModel> {
        return new Promise((resolve, reject) => {
            const sql = `INSERT
                         cart_item
                         SET
                         cart_item.amount = ?,
                         cart_item.cart_id = ?,
                         cart_item.item_id = ?`;

            this.databaseConnection.execute(sql, [amount, cartId, itemId]).then(result => {
               resolve(this.getById(cartId, {}));
            })
            .catch(error => {
               reject(error);
            })                                    
        })
    }

    public async deleteCartItem(cartId: number, itemId: number): Promise<CartModel> {
        return new Promise((resolve, reject) => {
            const sql = `DELETE FROM
                            cart_item
                        WHERE
                            cart_item.cart_id = ?
                        AND
                            cart_item.item_id = ?`;

            this.databaseConnection.execute(sql, [cartId, itemId]).then(result => {
               resolve(this.getById(cartId, {}));
            })
            .catch(error => {
               reject(error);
            })                                    
        })
    }

}