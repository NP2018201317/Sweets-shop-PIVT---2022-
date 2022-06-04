import ItemModel from './ItemModel.model';
import * as mysql2 from 'mysql2/promise';
import IAdapterOptions from '../../common/IAdapterOptions.interface';
import BaseService from '../../common/BaseService';

class ItemAdapterOptions implements IAdapterOptions {
    
}

class ItemService extends BaseService<ItemModel, ItemAdapterOptions>{
    tableName(): string {
        return "item";
    }

    protected async adaptToModel(data: any): Promise<ItemModel> {
        const item: ItemModel = new ItemModel();

        item.itemId = +data?.item_id; 
        item.name = data.name;
        item.imagePath = data.image_path;
        item.isActive = +data.is_active === 1;
        item.description = data.description;
        item.categoryId = +data.category_id;

        return item;
    }

    public async getAllByCategoryId(categoryId: number, options: ItemAdapterOptions): Promise<ItemModel[]> {
        return this.getAllByFieldNameAnValue('category_id', categoryId, options);

    }
}

export default ItemService;