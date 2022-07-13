import CategoryModel from './CategoryModel.model';
import IAdapterOptions from '../../common/IAdapterOptions.interface';
import ItemService from '../item/ItemService.service';
import IAddCategory from './dto/IAddCategory.dto';
import BaseService from '../../common/BaseService';
import IEditCategory from './dto/IEditCategory.dto';
import ICategory from '../../../../04-front-end/src/models/ICategory.model';
import * as mysql2 from 'mysql2/promise';

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
    sortFildName(): string {
        return "category_id"
    }
    protected async adaptToModel(data: any, options:ICategoryAdapterOptions = DefaultCategoryAdapterOptions): Promise<CategoryModel> {
        const category: CategoryModel = new CategoryModel();

        category.categoryId = +data?.category_id; 
        category.name = data.name;
        category.imagePath = data?.image_path;
        category.isActive = +data.is_active === 1;
        category.measurement = data.measurement;

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

    public async getAllCategoriesForAdmin(options:ICategoryAdapterOptions): Promise<ICategory[]> {
        return new Promise((resolve, reject) => {
          
            const sql: string = "SELECT * FROM category";

        this.databaseConnection.execute(sql).then(async ([rows]) => {

            const items: ICategory[] = [];
                    
                    for (const row of rows as mysql2.RowDataPacket[]) {
                        items.push(await this.adaptToModel(row, options));

                    }
                    resolve(items);

        })
        .catch(error => {
            reject(error);
        });
       
        
        })
    
}
        
}


export default CategoryService;
export { DefaultCategoryAdapterOptions};
