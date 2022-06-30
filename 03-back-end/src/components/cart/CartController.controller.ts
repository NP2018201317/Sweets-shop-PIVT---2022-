import { Request, Response } from 'express';
import BaseController from '../../common/BaseController';
import { AddToCartValidator, IAddToCartDto } from './dto/IAddToCart.dto';
import { EditInCartValidator, IEditInCartDto } from './dto/IEditInCart.dto';

export default class CartController extends BaseController {
    
    
    getCart(req: Request, res:Response) {
        this.services.cart.getUserCart(req.authorisation?.id).then(cart => {
            res.send(cart);
        })
        .catch(error => {
            res.status(500).send(error?.message);
        })
    }

    addToCart(req: Request, res: Response) {
        const data = req.body as IAddToCartDto;

        if (!AddToCartValidator(data)) {
            return res.status(400).send(AddToCartValidator.errors);
        }

        this.services.cart.getUserCart(req.authorisation?.id).then(cart => {
           const found = cart.items.find(cartItem => {
               return cartItem.item.itemId === data.itemId
           })
           if (found) {
                this.services.cart.editCartItemAmount(cart.cartId, found.item.itemId, found.amount + data.amount).then(cart => {
                    return res.send(cart);
                })
                .catch(error => {
                    throw error;
                });
            

            } else {
                this.services.cart.addCartItem(cart.cartId, data.itemId, data.amount).then(cart => {
                    return res.send(cart);

            })
            .catch(error => {
                throw error;
            });
        }  
        })
        .catch(error => {
            res.status(error?.status ?? 500).send(error?.message);
        });
        
    }

    editInCart(req: Request, res: Response) {
        const data = req.body as IEditInCartDto;

        if (!EditInCartValidator(data)) {
            return res.status(400).send(EditInCartValidator.errors);
        }

        this.services.cart.getUserCart(req.authorisation?.id).then(cart => {
           const found = cart.items.find(cartItem => {
               return cartItem.item.itemId === data.itemId
           })

           if (!found) {
                return res.status(404).send("An item is not in your cart!");
           }

           if (data.amount > 0) {
                this.services.cart.editCartItemAmount(cart.cartId, found.item.itemId, found.amount).then(cart => {
                    return res.send(cart);
                })
                .catch(error => {
                    throw error;
                });
           } else {
            
            this.services.cart.deleteCartItem(cart.cartId, found.item.itemId).then(cart => {
                return res.send(cart);
            })
            .catch(error => {
                throw error;
            });
           
           }
        })
        .catch(error => {
            res.status(error?.status ?? 500).send(error?.message);
        });
    }

    makeOrder(req: Request, res: Response) {

    }
}