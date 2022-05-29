import CategoryService, { DefaultCategoryAdapterOptions } from './CategoryServices.service';
import {Request, Response} from 'express';
import {AddCategoryValidator } from './dto/IAddCategory.dto';
import IAddCategory from './dto/IAddCategory.dto';
class CategoryController{
    private categoryService: CategoryService;

    constructor(categoryService: CategoryService) {
        this.categoryService = categoryService;

    }

    async getAll(req: Request, res: Response) {
        this.categoryService.getAll(DefaultCategoryAdapterOptions).then(result =>{
            res.send(result);
        }).catch(error => {
            res.status(500).send((error)?.message);
        });
    }

    async getByID(req: Request, res: Response) {
        const id: number = +req.params?.id;

        this.categoryService.getById(id, {loadItems:true}).then(result => {
            if (result === null) {
                return res.sendStatus(404);
            }

            res.send(result);
        })

        .catch(error => {
            res.status(500).send(error?.message);
        });
    }

    async add(req: Request,res: Response) {
        const data = req.body as IAddCategory;

        if( !AddCategoryValidator(data)) {
            return res.status(400).send(AddCategoryValidator.errors);
        
        }
        this.categoryService.add(data).then(result =>{
            res.send(result);
        })
        .catch(error => {
            res.status(400).send(error?.message);
        });
    
    }
}

export default CategoryController;