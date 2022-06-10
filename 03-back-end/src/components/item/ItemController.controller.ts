import BaseController from "../../common/BaseController";
import { Request, Response } from 'express';
import { AddItemValidator, IAddItemDto } from './dto/IAddItem.dto';
import { fdatasync } from "fs";


export default class ItemController extends BaseController {
    async getAllItemsByCategoryId(req: Request, res: Response) {
        const categoryId: number = +req.params?.cid;

        this.services.category.getById(categoryId, {loadItems:false}).then(result => {
            if (result === null) {
                return res.sendStatus(404).send("Category not found");
            }

            this.services.item.getAllByCategoryId(categoryId,{
            loadCategory:false,
            loadIngredient:false
                
            });
        })
        .then(result => {
            res.send(result);
        })
        .catch(error => {
            res.status(500).send(error?.message);

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
                image_path: data.imagePath
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
                }
            })
        })
        .catch(error => {
            res.status(500).send(error?.message);
        });
        
    }
}