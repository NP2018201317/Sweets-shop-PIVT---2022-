import CategoryModel from './CategoryModel.model';
import IAdapterOptions from '../../common/IAdapterOptions.interface';
import ItemService from '../item/ItemService.service';
import IAddCategory from './dto/IAddCategory.dto';
import BaseService from '../../common/BaseService';
import IEditCategory from './dto/IEditCategory.dto';

interface ICategoryAdapterOptions extends IAdapterOptions {
    loadItems: boolean;
}

const DefaultCategoryAdapterOptions : ICategoryAdapterOptions = {
    loadItems : false
}

class CategoryService extends BaseService<CategoryModel, ICategoryAdapterOptions>{
    tableName(): string {
        return "category";
    }

    protected async adaptToModel(data: any, options:ICategoryAdapterOptions = DefaultCategoryAdapterOptions): Promise<CategoryModel> {
        const category: CategoryModel = new CategoryModel();

        category.categoryId = +data?.category_id; 
        category.name = data.name;
        category.imagePath = data?.image_path;
        category.isActive = +data.is_active;

        if(options.loadItems){
            const itemService: ItemService = new ItemService(this.databaseConnection);

            category.items = await itemService.getAllByCategoryId(category.categoryId, options);
        }
        return category;
    
}


    public async add(data: IAddCategory): Promise<CategoryModel> {
        return this.baseAdd(data, DefaultCategoryAdapterOptions);
    }

    public async editById(categoryId: number, data:IEditCategory, options: ICategoryAdapterOptions = DefaultCategoryAdapterOptions): Promise<CategoryModel> {
        return this.baseEditBy(categoryId, data, options);
    }
        
}


export default CategoryService;
export { DefaultCategoryAdapterOptions};
