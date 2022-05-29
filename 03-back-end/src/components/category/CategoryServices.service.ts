import CategoryModel from './CategoryModel.model';
import * as mysql2 from 'mysql2/promise';
import IAdapterOptions from '../../common/IAdapterOptions.interface';
import ItemService from '../item/ItemService.service';
import IAddCategory from './dto/IAddCategory.dto';
import BaseService from '../../common/BaseService';

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
        return new Promise<CategoryModel>((resolve, reject) => {
            const sql: string = "INSERT `category` SET `name` = ?,`image_path` = ?;"; //treba dpdati measurment enum

            this.databaseConnection.execute(sql, [data.name,data.imagePath]).then(async result => {
                const info: any = result;

                const newCategoryId = +info[0]?.insertId;

                const newCategory: CategoryModel|null = await this.getById(newCategoryId, DefaultCategoryAdapterOptions);

                if (newCategory == null) {
                    return reject ({message: `Duplicate category name!`,});
                }

                resolve(newCategory);

            })
            .catch(error => {
                reject(error);
            });
        });
    }
}

export default CategoryService;
export { DefaultCategoryAdapterOptions};
