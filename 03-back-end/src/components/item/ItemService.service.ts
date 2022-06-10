import ItemModel from './ItemModel.model';
import * as mysql2 from 'mysql2/promise';
import IAdapterOptions from '../../common/IAdapterOptions.interface';
import BaseService from '../../common/BaseService';
import IAddItem from './dto/IAddItem.dto';
import { IItemIgredient } from './dto/IAddItem.dto';
import { resolve } from 'path';
import { rejects } from 'assert';

export interface IItemAdapterOptions extends IAdapterOptions {
    loadCategory: boolean,
    loadIngredient: boolean
}

export class DefaultItemAdapterOptions implements IItemAdapterOptions {
    loadCategory: false;
    loadIngredient: false;

}
class ItemService extends BaseService<ItemModel, IItemAdapterOptions>{
    tableName(): string {
        return "item";
    }

    protected adaptToModel(data: any, options: IItemAdapterOptions): Promise<ItemModel> {
        return new Promise(async(resolve) =>{

       
        const item: ItemModel = new ItemModel();

        item.itemId = +data?.item_id; 
        item.name = data.name;
        item.imagePath = data.image_path;
        item.isActive = +data.is_active === 1;
        item.description = data.description;
        item.categoryId = +data.category_id;

        if (options.loadCategory) {
            item.category = await this.services.category.getById(item.categoryId, {
                loadItems: true,
            });
        }

        if (options.loadIngredient) {

            item.ingredients = await this.services.ingredient.getAllByItemId(item.itemId, {});
        }

        
        resolve (item);
    })
    }

    

    public async getAllByCategoryId(categoryId: number, options: IItemAdapterOptions): Promise<ItemModel[]> {
        return this.getAllByFieldNameAnValue('category_id', categoryId, options);

    }

    async add(data: IAddItem): Promise<ItemModel>{
        return this.baseAdd(data, {
            loadCategory: false,
            loadIngredient: false,
        });
    }

    async addItemIngredient(data: IItemIgredient): Promise<number> {
        return new Promise((resolve, reject) => {
          
            const sql: string = "INSERT item_ingredient SET item_id = ?, ingredient_id = ?;";

        this.databaseConnection.execute(sql, [ data.item_id, data.ingredient_id ]).then(async result => {
            const info: any = result;

            const newItemIngredientId = +info[0]?.insertId;

            resolve(newItemIngredientId);

        })
        .catch(error => {
            reject(error);
        });
       
        
        })
    
}

}

export default ItemService;