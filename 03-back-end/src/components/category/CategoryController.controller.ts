import CategoryService, { DefaultCategoryAdapterOptions } from './CategoryServices.service';
import {Request, Response} from 'express';
import {AddCategoryValidator} from './dto/IAddCategory.dto';
import IAddCategory from './dto/IAddCategory.dto';
import IEditCategory, { EditCategoryValidator, IEditCategoryDto } from './dto/IEditCategory.dto';
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
            res.status(500).send(error?.message);
        });
    
    }

    async edit(req: Request,res: Response){
        const id: number = +req.params?.id;
        const data = req.body as IEditCategoryDto;

        if( !EditCategoryValidator(data)) {
            return res.status(400).send(EditCategoryValidator.errors);
        
        }

        this.categoryService.getById(id, {loadItems:false}).then(result => {
            if (result === null) {
                return res.sendStatus(404);
            }

            this.categoryService.editById(id, {
                name: data.name,
                image_path: data.image_path // e ovde vrv treba sa leve strane da bude camel case
            })
            .then(result => {
                res.send(result);
                
            })
            
        })

        .catch(error => {
            res.status(500).send(error?.message);
        });

}

}

export default CategoryController;