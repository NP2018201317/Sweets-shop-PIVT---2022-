import ItemModel from './ItemModel.model';
import * as mysql2 from 'mysql2/promise';
import IAdapterOptions from '../../common/IAdapterOptions.interface';
import BaseService from '../../common/BaseService';
import IAddItem from './dto/IAddItem.dto';
import { IItemIgredient } from './dto/IAddItem.dto';
import { resolve } from 'path';
import { rejects } from 'assert';
import IEditItem from './dto/IEditItem.dto';

export interface IItemAdapterOptions extends IAdapterOptions {
    loadCategory: boolean,
    loadIngredient: boolean,
    hideInactiveCategories: boolean
}

export class DefaultItemAdapterOptions implements IItemAdapterOptions {
    loadCategory: false;
    loadIngredient: false;
    hideInactiveCategories: true;

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
        
        /// treba dodati hideInactive
        
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
            hideInactiveCategories:true
        });
    }

    async edit(itemId: number, data: IEditItem, options: IItemAdapterOptions): Promise<ItemModel> {
        return this.baseEditById(itemId, data, options);
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

async deleteItemIngredient(data: IItemIgredient): Promise<number> {
    return new Promise((resolve, reject) => {
      
        const sql: string = "DELETE FROM item_ingredient WHERE item_id = ? AND ingredient_id = ?;";

    this.databaseConnection.execute(sql, [ data.item_id, data.ingredient_id ]).then(async result => {
        const info: any = result;

        const newItemIngredientId = +info[0]?.affectedRows;

        resolve(newItemIngredientId);

    })
    .catch(error => {
        reject(error);
    });
   
    
    })

}


}

export default ItemService;