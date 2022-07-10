import BaseController from "../../common/BaseController";
import { Request, Response } from 'express';
import { AddItemValidator, IAddItemDto } from './dto/IAddItem.dto';
import { fdatasync } from "fs";
import CategoryModel from '../category/CategoryModel.model';
import ItemModel from './ItemModel.model';
import { EditItemValidator, IEditItemDto } from './dto/IEditItem.dto';
import { resolve } from 'path';


export default class ItemController extends BaseController {

    async getAll(req: Request, res: Response) {
        if(req.authorisation?.role === "administrator"){
            return res.send([
                "test for " + req.authorisation?.identity  
            ]);

        }


        this.services.item.getAll({loadCategory: false, loadIngredient: false, hideInactiveCategories: false}).then(result =>{
            res.send(result);
        }).catch(error => {
            res.status(500).send((error)?.message);
        });
    }

    async getById(req: Request, res: Response) {
        const id: number = +req.params?.id;

        this.services.item.getById(id, {loadCategory: false, loadIngredient: true, hideInactiveCategories: false}).then(result => {
            if (result === null) {
                return res.sendStatus(404);
            }

            res.send(result);
        })

        .catch(error => {
            res.status(500).send(error?.message);
        });
    }



    async getAllItemsByCategoryId(req: Request, res: Response) {
        const categoryId: number = +req.params?.cid;

        this.services.category.getById(categoryId, {loadItems:false}).then(result => {
            if (result === null) {
                return res.sendStatus(404).send("Category not found");
            }

            this.services.item.getAllByCategoryId(categoryId,{
            loadCategory:false,
            loadIngredient:true,
            hideInactiveCategories:true
                
            })
        
        .then(result => {
            res.send(result);
        })
        .catch(error => {
            res.status(500).send(error?.message);

        })  
        
    })

        .catch(error => {
            res.status(500).send(error?.message);
        });

    }

    async add(req: Request, res: Response) {
        const categoryId: number = +req.params?.cid;
        const data = req.body as IAddItemDto;

        if (!AddItemValidator(data)) {
            return res.status(400).send(AddItemValidator.errors);
        }

        this.services.category.getById(categoryId, {loadItems:false}).then(result => {
            if (result === null) {
                return res.status(404).send("Category not found!");
            }

            const availableIngredients: number[] = result.items.map(ingredient => ingredient.itemId);
            for (let givenIngredientId of data.ingredientIds) {
                if (!availableIngredients.includes(givenIngredientId)) {
                    return res.status(404).send(`Ingredient ${givenIngredientId} not found in this category!`)
                }
            }
            this.services.item.add({
                name: data.name,
                category_id: categoryId,
                description: data.description,
                image_path: data.imagePath,
                price: data.price
            })
            .then(newItem => {
                for (let givenIngredientIds of data.ingredientIds) {
                    this.services.item.addItemIngredient({
                        item_id: newItem.itemId,
                        ingredient_id: givenIngredientIds,
                    })
                    .catch(error => {
                        res.status(500).send(error?.message);
                    })

                    this.services.item.getById(newItem.itemId, {
                        loadCategory:true,
                        loadIngredient: true,
                        hideInactiveCategories: true
                    })
                    .then(result => {
                        res.send(result);

                    })

                    .catch(error => {
                        res.status(500).send(error?.message);
                    });
                    
                }
            })
        })
        .catch(error => {
            res.status(500).send(error?.message);
        });
        
    }

    async edit(req: Request, res: Response) {
        const categoryId: number = +req.params?.cid;

        const data = req.body as IEditItemDto;

        if (!EditItemValidator(data)) {
            res.status(400).send(EditItemValidator.errors);
        }

        this.services.category.getById(categoryId, {
            loadItems: true,
        })    
        .then(result => {
            if (result === null) {
                throw{
                    status: 404,
                    message: "Category not found!"
                };
            }

            return result as CategoryModel;
        })
        .then(async category => {
            const itemId: number = +req.params?.iid;

            return this.retriveItem(category, itemId);
        })
        .then(this.checkItem)
        .then(async result => {
            this.services.item.startTransaction();
            return result;
        })
        .then(async result => {
           const currentIngredientsIds = result.item.ingredients?.map(ingredient => ingredient.ingredientId);
           // const data = req.body as IEditItemDto;
           const newIngredientsIds = data.ingredientIds;

           const availableIngredientsIds = result.item.ingredients?.map(i => i.ingredientId);

           for (let id of data.ingredientIds) {
                if (!availableIngredientsIds.includes(id)) {
                    throw {
                        status: 400,
                        message: "Ingredient" + id + "is not available"
                    }
                }
           }

           const ingredientIdsToAdd = newIngredientsIds.filter(id => !currentIngredientsIds.includes(id));
           

           for (let id of ingredientIdsToAdd) {
                if (!await this.services.item.addItemIngredient({
                    item_id: result.item.itemId,
                    ingredient_id: id,
                })) {
                    throw {
                        status:500,
                        message: "Error adding a new ingredient to this item!"
                    }
                }
           }

           const ingredientsIdsToDelete = currentIngredientsIds.filter(id => !newIngredientsIds.includes(id));

           for (let id of ingredientsIdsToDelete) {
                if (!await this.services.item.deleteItemIngredient({
                    item_id: result.item.itemId,
                    ingredient_id: id,
                })) {
                    throw {
                        status:500,
                        message: "Error deleting an existing ingredient from this item!"
                    }
                }
           }
            await this.services.item.edit(result.item.itemId, {
                name:data.name,
                description: data.description,
                image_path: data.imagePath,
                is_active: data.isActive ? 1 : 0,
                price: data.price

           }, {

                loadCategory: false,
                loadIngredient:false,
                hideInactiveCategories: false
           })

           return result;

        })
        .then(async result => {
            this.services.item.comitChanges();
            res.send(await this.services.item.getById(result.item.itemId, {

                loadCategory: true,
                loadIngredient:true,
                hideInactiveCategories: true
           })
);
        })
        
        .catch(async error  =>{
            await this.services.item.rollbackChanges();

            res.status(error?.status).send(error?.message);
        })
        
        
    }

    private async retriveItem( category: CategoryModel, itemId: number): Promise<{category: CategoryModel, item: ItemModel|null}> {
       
            return {
                category: category,
                item: await this.services.item.getById(itemId, {
                    loadCategory: false,
                    loadIngredient: true,
                    hideInactiveCategories: false
            })
            }
    }

    private checkItem(result: {category: CategoryModel, item:ItemModel|null}): {category: CategoryModel, item: ItemModel} {
        if (result.item === null) {
            throw{
                status: 404,
                message: "Item not found!"
            }
        }

        if (result.item.categoryId !== result.category.categoryId) {
            throw{
                status: 404,
                message: "Item not found in this category!"
            }
        }

        return result;
    }
}