import CategoryService, { DefaultCategoryAdapterOptions } from './CategoryServices.service';
import {Request, Response} from 'express';
import {AddCategoryValidator, IAddCategoryDto} from './dto/IAddCategory.dto';
import IAddCategory from './dto/IAddCategory.dto';
import IEditCategory, { EditCategoryValidator, IEditCategoryDto } from './dto/IEditCategory.dto';
import BaseController from '../../common/BaseController';
import IEditAdministrator from '../administrator/dto/IEditAdministrator.dto';
class CategoryController extends BaseController{
    

    async getAll(req: Request, res: Response) {
        if(req.authorisation?.role === "administrator"){
            return res.send([
                "test for " + req.authorisation?.identity  
            ]);

        }


        this.services.category.getAll(DefaultCategoryAdapterOptions).then(result =>{
            res.send(result);
        }).catch(error => {
            res.status(500).send((error)?.message);
        });
    }

    async getById(req: Request, res: Response) {
        const id: number = +req.params?.id;

        this.services.category.getById(id, {loadItems:false}).then(result => {
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
        const data = req.body as IAddCategoryDto;

        if( !AddCategoryValidator(data)) {
            return res.status(400).send(AddCategoryValidator.errors);
        
        }
        this.services.category.add({
            name: data.name,
            image_path: data.imagePath,
            measurement: data.measurement
        }).then(result =>{
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
        const serviceData: IEditCategory = { };

         this.services.category.getById(id, {loadItems:false}).then(result => {

             if (result === null) {
                 return res.sendStatus(404);
             }

            if(data.name !== undefined) {
                serviceData.name = result.name
            }
        
            if(data.imagePath !== undefined) {
                serviceData.image_path = result.imagePath 
            }
    
            if (data.isActive !== undefined) {
                serviceData.is_active = data.isActive ? 1 : 0;
            }


            this.services.category.editById(id, serviceData)
            .then(result => {
                res.send(result);
                
            })
            .catch(error => {
                res.status(500).send(error?.message);
            }); 
         })

         .catch(error => {
            res.status(500).send(error?.message);
         });

}

async deleteCategory(req: Request, res: Response) {
    const categoryId: number = +req.params?.id;

    this.services.category.baseDeleteById(categoryId).then(result => {
        if (result === null) {
            return res.sendStatus(404);
        }

        res.send("This category has been deleted!");
    })

    .catch(error => {
        res.status(500).send(error?.message);
    });

}

async getAllCategoriesAdmin(req: Request, res: Response) {
    if(req.authorisation?.role === "administrator"){
        return res.send([
            "test for " + req.authorisation?.identity  
        ]);

    }


    this.services.category.getAllCategoriesForAdmin({loadItems: false}).then(result =>{
        res.send(result);
    }).catch(error => {
        res.status(500).send((error)?.message);
    });
}

    

}

export default CategoryController;