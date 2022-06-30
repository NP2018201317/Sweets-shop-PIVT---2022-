import IRouter from "../../common/IRouter.interface";
import * as express from 'express';
import IApplicationResources from '../../common/IApplicationResources.interface';
import CartController from '../cart/CartController.controller';
import AuthMiddleware from '../../middlewares/AuthMiddleware';

export default class CartRouter implements IRouter {
    public setupRoutes(application: express.Application, resources: IApplicationResources){
        
        const cartController: CartController = new CartController(resources.services);

        application.get("/api/cart", AuthMiddleware.getVerifier("user"), cartController.getCart.bind(cartController));
        application.post("/api/cart", AuthMiddleware.getVerifier("user"), cartController.addToCart.bind(cartController)); 
        application.put("/api/cart", AuthMiddleware.getVerifier("user"), cartController.editInCart.bind(cartController));   

    }
}