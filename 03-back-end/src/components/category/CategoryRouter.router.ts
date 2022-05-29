import CategoryService from './CategoryServices.service';
import CategoryController from './CategoryController.controller';
import * as express from 'express';
import IApplicationResources from '../../common/IApplicationResources.interface';
import IRouter from '../../common/IRouter.interface';

class CategoryRouter implements IRouter{
    public setupRoutes(application: express.Application, resources: IApplicationResources){
        
        const categoryService: CategoryService = new CategoryService(resources.databaseConnection);
        const categoryController: CategoryController = new CategoryController(categoryService);

        application.get("/api/category", categoryController.getAll.bind(categoryController));
        application.get("/api/category/:id", categoryController.getByID.bind(categoryController));
        application.post("/api/category", categoryController.add.bind(categoryController));

    }
}

export default CategoryRouter;