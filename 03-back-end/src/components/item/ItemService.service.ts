import ItemModel from './ItemModel.model';
import * as mysql2 from 'mysql2/promise';
import IAdapterOptions from '../../common/IAdapterOptions.interface';
import BaseService from '../../common/BaseService';

export interface IItemAdapterOptions extends IAdapterOptions {
    loadCategory: false,
    loadIngredient: false
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

        
        resolve (item);
    })
    }

    

    public async getAllByCategoryId(categoryId: number, options: IItemAdapterOptions): Promise<ItemModel[]> {
        return this.getAllByFieldNameAnValue('category_id', categoryId, options);

    }
}

export default ItemService;