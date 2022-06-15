import CategoryModel from './CategoryModel.model';
import IAdapterOptions from '../../common/IAdapterOptions.interface';
import ItemService from '../item/ItemService.service';
import IAddCategory from './dto/IAddCategory.dto';
import BaseService from '../../common/BaseService';
import IEditCategory from './dto/IEditCategory.dto';

interface ICategoryAdapterOptions extends IAdapterOptions {
    loadItems: boolean;
    //ovde treba da dodam logiku za prikazivanje slike u odnosu na rolu
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
        category.isActive = +data.is_active === 1;

        if(options.loadItems){
            
            category.items = await this.services.item.getAllByCategoryId(category.categoryId, {
                loadCategory: false,
                loadIngredient: false,
                hideInactiveCategories: false
            }
            );
        }
        return category;
    
}


    public async add(data: IAddCategory): Promise<CategoryModel> {
        return this.baseAdd(data, DefaultCategoryAdapterOptions);
    }

    public async editById(categoryId: number, data:IEditCategory, options: ICategoryAdapterOptions = DefaultCategoryAdapterOptions): Promise<CategoryModel> {
        return this.baseEditById(categoryId, data, options);
    }
        
}


export default CategoryService;
export { DefaultCategoryAdapterOptions};
