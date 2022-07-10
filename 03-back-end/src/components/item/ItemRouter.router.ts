import * as express from 'express';
import IApplicationResources from '../../common/IApplicationResources.interface';
import AuthMiddleware from '../../middlewares/AuthMiddleware';
import IRouter from '../../common/IRouter.interface';
import ItemController from './ItemController.controller';

class ItemRouter implements IRouter {
    public setupRoutes(application: express.Application, resources: IApplicationResources) {
        
    
        
    const itemController: ItemController = new ItemController(resources.services);

    application.get("/api/item", AuthMiddleware.getVerifier("administrator", "user"), itemController.getAll.bind(itemController));
    application.get("/api/item/:id", AuthMiddleware.getVerifier("administrator", "user"), itemController.getById.bind(itemController));

    }

}

export default ItemRouter;