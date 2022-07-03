import CategoryController from './CategoryController.controller';
import * as express from 'express';
import IApplicationResources from '../../common/IApplicationResources.interface';
import IRouter from '../../common/IRouter.interface';
import ItemController from '../item/ItemController.controller';
import AuthMiddleware from '../../middlewares/AuthMiddleware';

class CategoryRouter implements IRouter{
    public setupRoutes(application: express.Application, resources: IApplicationResources){
        
        const categoryController: CategoryController = new CategoryController(resources.services);
        const itemController: ItemController = new ItemController(resources.services);

        application.get("/api/category", AuthMiddleware.getVerifier("administrator", "user"), categoryController.getAll.bind(categoryController));
        application.get("/api/category/:id", AuthMiddleware.getVerifier("administrator", "user"),categoryController.getById.bind(categoryController));
        application.post("/api/category", AuthMiddleware.getVerifier("administrator"),categoryController.add.bind(categoryController));
        application.put("/api/category/:id", AuthMiddleware.getVerifier("administrator"),categoryController.edit.bind(categoryController));
        application.delete("/api/category/:id", AuthMiddleware.getVerifier("administrator"),categoryController.deleteCategory.bind(categoryController));
        application.get("/api/category/:cid/item", AuthMiddleware.getVerifier("administrator", "user"),itemController.getAllItemsByCategoryId.bind(itemController));
        application.post("/api/category/:cid/item", AuthMiddleware.getVerifier("administrator"),itemController.add.bind(categoryController));
        application.put("/api/category/:cid/item", AuthMiddleware.getVerifier("administrator"),itemController.edit.bind(itemController));

    }
}

export default CategoryRouter;